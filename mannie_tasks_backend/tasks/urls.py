from django.urls import path
from .views import TaskDetail, TaskList, TaskDelete

urlpatterns = [
    path('tasks/', TaskList.as_view(), name='task-list'),
    path('tasks/<int:pk>/', TaskDetail.as_view(), name='task-detail'),
    path('tasks/<int:pk>/delete/', TaskDelete.as_view(), name='task-delete'),  # New delete endpoint
]
