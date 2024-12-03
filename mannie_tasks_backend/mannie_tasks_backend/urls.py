from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse


def root_view(request):
    return JsonResponse({"message": "Welcome to MannieTasks API!"})

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('tasks.urls')),  # Include the tasks app
    # path('', root_view),  # Add a root route
]
