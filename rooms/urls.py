from django.urls import path
from .views import RoomListView, RoomDetailView

urlpatterns = [
    path('', RoomListView.as_view()),
    path('<int:pk>/', RoomDetailView.as_view())
]