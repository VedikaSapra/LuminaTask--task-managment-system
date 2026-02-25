from django.urls import path
from .views import MissionListCreateView, MissionDetailView, DashboardView

urlpatterns = [
    path('', MissionListCreateView.as_view(), name='mission-list-create'),
    path('<int:pk>/', MissionDetailView.as_view(), name='mission-detail'),
    path('dashboard/', DashboardView.as_view(), name='dashboard'),
]
