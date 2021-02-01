from django.urls import path
from .views import RoomListView, RoomDetailView

urlpatterns = [
    path('<pk>/', RoomDetailView.as_view()),
    path('', RoomListView.as_view()),
]