# Generated by Django 3.1.2 on 2020-10-20 19:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('skills', '0001_initial'),
        ('jwt_auth', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='profile_image',
            field=models.CharField(blank=True, max_length=300),
        ),
        migrations.AlterField(
            model_name='user',
            name='skills',
            field=models.ManyToManyField(blank=True, related_name='user_skills', to='skills.Skill'),
        ),
    ]
