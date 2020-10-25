from django.db import models

class ChatMessage(models.Model):
    text = models.TextField(max_length=250)
    time_stamp = models.DateTimeField(auto_now_add=True)
    user_id = models.ForeignKey(
        'jwt_auth.User',
        related_name='messages',
        on_delete = models.CASCADE
    )
    room_id = models.ForeignKey(
        'rooms.Room',
        related_name='messages',
        on_delete=models.CASCADE
    )