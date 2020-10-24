from rest_framework.urls import path
from .views import SkillsListView

urlpatterns = [
    path('', SkillsListView.as_view())
]