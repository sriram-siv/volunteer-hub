from django.urls import path
from .views import RegisterView, LoginView, ProfileListView, ProfileDetailView, ProfileSkillsView, ProfileShiftView, AuthToken

urlpatterns = [
    path('register/', RegisterView.as_view()),
    path('login/', LoginView.as_view()),
    path('token/', AuthToken.as_view()),
    path('', ProfileListView.as_view()),
    path('<int:pk>/skills/', ProfileSkillsView.as_view()),
    path('<int:pk>/shifts/', ProfileShiftView.as_view()),
    path('<int:pk>/', ProfileDetailView.as_view()),
]