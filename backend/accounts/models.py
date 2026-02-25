from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    email = models.EmailField(unique=True)
    total_xp = models.IntegerField(default=0)
    level = models.IntegerField(default=1)
    current_streak = models.IntegerField(default=0)
    avatar = models.CharField(max_length=50, default='Warrior')
    last_completion_date = models.DateField(null=True, blank=True)

    def __str__(self):
        return self.username
