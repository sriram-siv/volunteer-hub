from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    username = models.CharField(max_length=30, unique=True)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    email = models.EmailField()
    phone = models.CharField(max_length=15, blank=True)
    profile_image = models.CharField(max_length=300, default="https://res.cloudinary.com/dmhj1vjdf/image/upload/v1603705159/volunteers/fg5afp4hagsrz2fgkbwd.png")
    active = models.BooleanField(default=True)

    def __str__(self):
        return f'{self.last_name}, {self.first_name}'
