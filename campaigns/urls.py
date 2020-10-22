from django.urls import path
from .views import CampaignListView, CampaignDetailView, CampaignVolunteerView

urlpatterns = [
    path('', CampaignListView.as_view()),
    path('<int:pk>/volunteers', CampaignVolunteerView.as_view()),
    path('<int:pk>/', CampaignDetailView.as_view())
]