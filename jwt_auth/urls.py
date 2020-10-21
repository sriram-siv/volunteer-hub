from django.urls import path
from .views import RegisterView, LoginView, ProfileListView, ProfileDetailView

urlpatterns = [
    path('register/', RegisterView.as_view()),
    path('login/', LoginView.as_view()),
    path('', ProfileListView.as_view()),
    path('<int:pk>/', ProfileDetailView.as_view())
]