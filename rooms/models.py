from django.db import models

class Room(models.Model):
    name = models.CharField(max_length=30)
    members = models.ManyToManyField(
        'jwt_auth.User',
        related_name='message_rooms'
    )

    def __str__(self):
        return f'{self.name}'