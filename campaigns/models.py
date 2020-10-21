from django.db import models

class Campaign(models.Model):
    name = models.CharField(max_length=50)
    volunteer_count = models.IntegerField()
    description = models.TextField(max_length=250)
    start_date = models.DateTimeField()
    active = models.BooleanField(default=True)
    coordinator = models.ForeignKey(
        'jwt_auth.User',
        related_name='coord_campaigns',
        on_delete=models.CASCADE
    )
    volunteers = models.ManyToManyField(
        'jwt_auth.User',
        related_name='campaigns',
        blank=True
    )
    skills = models.ManyToManyField(
        'skills.Skill',
        related_name='campaign_skills',
        blank=True
    )

    def __str__(self):
        return f'{self.name} - Active: {self.active}'
