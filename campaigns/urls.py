from django.urls import path
from .views import CampaignListView, CampaignDetailView

urlpatterns = [
    path('', CampaignListView.as_view()),
    path('<int:pk>/', CampaignDetailView.as_view())
]
