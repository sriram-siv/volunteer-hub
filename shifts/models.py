from django.db import models


class Shift(models.Model):
    name = models.CharField(max_length=30)
    users = models.ManyToManyField(
        'jwt_auth.User',
        related_name = 'user_shifts',
        blank=True
    )

    def __str__(self):
        return f'{self.name}'
