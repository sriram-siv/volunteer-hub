from rest_framework import serializers
from ..models import Notice

class NoticeSerializer(serializers.ModelSerializer):

    class Meta(self):
        fields: '__all__'