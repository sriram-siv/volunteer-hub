from rest_framework import serializers
from ..models import Campaign
from .common import CampaignSerializer
from tags.serializers.nested import NestedTagSerializer
from skills.serializers.nested import NestedSkillSerializer

class IndexSerializer(CampaignSerializer):

    tags = NestedTagSerializer(many=True)
    campaign_skills = NestedSkillSerializer(many=True)
