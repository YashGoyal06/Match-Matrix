from django.urls import path
from . import views

app_name = 'api'

urlpatterns = [
    # Public endpoints
    path('register/', views.register_participant, name='register'),
    path('my-match/', views.get_my_match, name='my_match'),
    
    # Admin endpoints
    path('admin/generate-matches/', views.generate_matches, name='generate_matches'),
    path('admin/participants/', views.get_all_participants, name='all_participants'),
    path('admin/matches/', views.get_all_matches, name='all_matches'),
]
