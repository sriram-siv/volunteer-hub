from django.db import models

class ChatMessage(models.Model):
    message = models.TextField(max_length=250)
    time_stamp = models.DateTimeField(auto_now_add=True)
    sender = models.ForeignKey(
        'jwt_auth.User',
        related_name='messages',
        on_delete = models.CASCADE
    )
    room = models.ForeignKey(
        'rooms.Room',
        related_name='messages',
        on_delete=models.CASCADE
    )