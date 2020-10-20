from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    email = models.CharField(max_length=50, unique=True)
    phone = models.CharField(max_length=15)
    profile_image = models.CharField(max_length=300, blank=True)
    active = models.BooleanField(default=True)
    skills = models.ManyToManyField(
        'skills.Skill',
        related_name='user_skills',
        blank=True
    )

    def __str__(self):
        return f'{self.last_name}, {self.first_name}'
