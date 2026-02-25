from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Mission
from .serializers import MissionSerializer


class MissionListCreateView(generics.ListCreateAPIView):
    serializer_class = MissionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        qs = Mission.objects.filter(user=self.request.user).order_by('-created_at')
        priority = self.request.query_params.get('priority')
        is_completed = self.request.query_params.get('is_completed')
        if priority:
            qs = qs.filter(priority=priority)
        if is_completed is not None:
            qs = qs.filter(is_completed=is_completed.lower() == 'true')
        return qs

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class MissionDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = MissionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Mission.objects.filter(user=self.request.user)


class DashboardView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = request.user
        missions = Mission.objects.filter(user=user)
        total = missions.count()
        completed = missions.filter(is_completed=True).count()
        return Response({
            'username': user.username,
            'email': user.email,
            'avatar': getattr(user, 'avatar', None),
            'total_xp': user.total_xp,
            'level': user.level,
            'current_streak': user.current_streak,
            'total_missions': total,
            'completed_missions': completed,
        })
