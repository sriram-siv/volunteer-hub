from django.db import models

class Campaign(models.Model):
    name = models.CharField(max_length=50)
    volunteer_count = models.IntegerField()
    description = models.TextField(max_length=800)
    latitude = models.CharField(max_length=20)
    longitude = models.CharField(max_length=20)
    start_date = models.DateTimeField()
    active = models.BooleanField(default=True)
    owner = models.ForeignKey(
        'jwt_auth.User',
        related_name='owned_campaigns',
        on_delete=models.CASCADE
    )
    coordinators = models.ManyToManyField(
        'jwt_auth.User',
        related_name='coord_campaigns',
        blank=True
    )
    pend_volunteers = models.ManyToManyField(
        'jwt_auth.User',
        related_name='pend_campaigns',
        blank=True
    )
    conf_volunteers = models.ManyToManyField(
        'jwt_auth.User',
        related_name='conf_campaigns',
        blank=True
    )

    def __str__(self):
        return f'{self.name} - Active: {self.active}'
