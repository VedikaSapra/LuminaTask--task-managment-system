from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User

@admin.register(User)
class CustomUserAdmin(UserAdmin):
    model = User
    list_display = ['username', 'email', 'level', 'total_xp', 'current_streak', 'is_staff']
    fieldsets = UserAdmin.fieldsets + (
        ('RPG Stats', {'fields': ('total_xp', 'level', 'current_streak', 'last_completion_date')}),
    )
    add_fieldsets = UserAdmin.add_fieldsets + (
        ('RPG Stats', {'fields': ('total_xp', 'level', 'current_streak', 'last_completion_date')}),
    )
