from django.urls import path
from . import views

urlpatterns = [
    path('verify/', views.verify_user, name='verify_user'),
    path('register/', views.register_participant, name='register_participant'),
    path('register-duo/', views.register_duo, name='register_duo'), # New Path
    path('my-match/', views.get_my_match, name='get_my_match'),
    path('participants/', views.get_participants, name='get_participants'),
    path('matches/', views.get_matches, name='get_matches'),
    path('trigger-matching/', views.trigger_matching, name='trigger_matching'),
]
