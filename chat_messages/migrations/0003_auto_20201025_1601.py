# Generated by Django 3.1.2 on 2020-10-25 16:01

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('chat_messages', '0002_auto_20201025_1401'),
    ]

    operations = [
        migrations.RenameField(
            model_name='chatmessage',
            old_name='user_id',
            new_name='user',
        ),
    ]
