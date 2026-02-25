from django.contrib import admin
from .models import Mission

@admin.register(Mission)
class MissionAdmin(admin.ModelAdmin):
    list_display = ['title', 'user', 'category', 'priority', 'xp_reward', 'is_completed', 'created_at']
    list_filter = ['is_completed', 'category', 'priority', 'created_at']
    search_fields = ['title', 'user__username', 'description']
    readonly_fields = ['completed_at']


# Username: Superuser
# Email: superuser@gmail.com
# Password:12345
