from datetime import date, timedelta
import math
from django.db import models
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils import timezone


class Mission(models.Model):
    PRIORITY_CHOICES = [
        ('Low', 'Low'),
        ('Medium', 'Medium'),
        ('High', 'High'),
    ]

    CATEGORY_CHOICES = [
        ('Fitness', 'Fitness'),
        ('Coding', 'Coding'),
        ('Reading', 'Reading'),
        ('Health', 'Health'),
        ('Education', 'Education'),
        ('Work', 'Work'),
        ('Gaming', 'Gaming'),
        ('Content Creation', 'Content Creation'),
        ('Travel', 'Travel'),
        ('Cooking', 'Cooking'),
        ('Music', 'Music'),
        ('Other', 'Other'),
    ]

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='missions'
    )
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    priority = models.CharField(max_length=10, choices=PRIORITY_CHOICES, default='Medium')
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default='Other')
    deadline = models.DateField(null=True, blank=True)
    xp_reward = models.IntegerField(default=50)
    is_completed = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    completed_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"{self.title} ({self.user.username})"


@receiver(post_save, sender=Mission)
def award_xp_on_completion(sender, instance, created, **kwargs):
    """Award XP to user the first time a mission is marked complete and manage streaks."""
    if not created and instance.is_completed and instance.completed_at is None:
        user = instance.user
        today = date.today()

        # 1. Update Streak Logic
        if user.last_completion_date:
            if user.last_completion_date == today:
                # Already completed something today, streak stays the same
                pass
            elif user.last_completion_date == today - timedelta(days=1):
                # Completed something yesterday, increment streak
                user.current_streak += 1
            else:
                # More than a day gap, reset streak (but start fresh today)
                user.current_streak = 1
        else:
            # First mission ever
            user.current_streak = 1

        user.last_completion_date = today

        # 2. Update XP and Level
        user.total_xp += instance.xp_reward
        user.level = math.floor(user.total_xp / 1000) + 1

        user.save()

        # 3. Mark completion time (update to avoid signal loop)
        Mission.objects.filter(pk=instance.pk).update(completed_at=timezone.now())
