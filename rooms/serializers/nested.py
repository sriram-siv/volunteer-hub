from rest_framework import serializers
from ..models import Room

class NestedRoomSerializer(serializers.ModelSerializer):

    class Meta:
        model = Room
        fields = ('id', 'name')