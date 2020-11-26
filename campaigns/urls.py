from django.urls import path
from .views import CampaignListView, CampaignDetailView, CampaignVolunteerView, CampaignSkillView, CampaignCoordinatorView


urlpatterns = [
    path('', CampaignListView.as_view()),
    path('<int:pk>/volunteers/', CampaignVolunteerView.as_view()),
    path('<int:pk>/coordinators/', CampaignCoordinatorView.as_view()),
    path('<int:pk>/skills/', CampaignSkillView.as_view()),
    path('<int:pk>/', CampaignDetailView.as_view())
]
