from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()

class NestedUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('id', 'last_name', 'first_name', 'username')
        