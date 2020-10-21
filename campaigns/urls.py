from django.urls import path
from .views import CampaignListView

urlpatterns = [
    path('', CampaignListView.as_view())
]
