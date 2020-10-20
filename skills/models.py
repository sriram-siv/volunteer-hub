from django.db import models

class Skill(models.Model):
    name = models.CharField(max_length=30)

    def __str__(self):
        return f'{self.name}'
