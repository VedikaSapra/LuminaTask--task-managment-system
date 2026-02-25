from rest_framework import serializers
from .models import Mission


class MissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Mission
        fields = (
            'id', 'title', 'description', 'priority', 'category',
            'deadline', 'xp_reward', 'is_completed', 'created_at', 'completed_at'
        )
        read_only_fields = ('id', 'created_at', 'completed_at')
