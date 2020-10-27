from django.urls import path
from .views import ShiftListView

urlpatterns = [
    path('', ShiftListView.as_view())
]