from rest_framework import serializers
from tags.serializers.common import TagSerializer
from ..models import Tag

class NestedTagSerializer(serializers.ModelSerializer):

    class Meta:
        model = Tag
        fields = ('name',)