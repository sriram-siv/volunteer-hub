from django.db import models

class Room(models.Model):
    id = models.CharField(primary_key=True, max_length=8)
    name = models.CharField(max_length=30)
    members = models.ManyToManyField(
        'jwt_auth.User',
        related_name='message_rooms',
        blank=True
    )
    campaign = models.ForeignKey(
        'campaigns.Campaign',
        related_name='message_rooms',
        on_delete=models.CASCADE
    )

    def __str__(self):
        return f'{self.campaign}, {self.name}'