from rest_framework import serializers
from ..models import Skill


class NestedSkillSerializer(serializers.ModelSerializer):

    class Meta:
        model = Skill
        fields = ('id', 'name')