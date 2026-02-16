from django.urls import path
from . import views

urlpatterns = [
    path('verify-user/', views.verify_user),
    path('register/', views.register_participant),
    path('trigger-matching/', views.trigger_matching),
    path('get-my-match/', views.get_my_match)
]