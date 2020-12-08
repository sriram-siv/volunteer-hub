from rest_framework import serializers
from ..models import Shift

class ShiftSerializer(serializers.ModelSerializer):

    class Meta:
        model = Shift
        fields = ('id', 'name')


