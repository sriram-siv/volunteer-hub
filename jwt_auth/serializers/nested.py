from rest_framework import serializers
from django.contrib.auth import get_user_model
from .populated import PopulatedUserSerializer

User = get_user_model()

class NestedUserSerializer(PopulatedUserSerializer):

    class Meta:
        model = User
        fields = ('id', 'last_name', 'first_name', 'username', 'profile_image', 'user_skills', 'user_shifts')
        