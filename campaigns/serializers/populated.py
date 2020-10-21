from rest_framework import serializers
from ..serializers.common import CampaignSerializer
from jwt_auth.serializers.nested import NestedUserSerializer
from skills.serializers.common import SkillSerializer

class PopulatedCampaignSerializer(CampaignSerializer):

    coordinator = NestedUserSerializer()
    volunteers = NestedUserSerializer(many=True)
    skills = SkillSerializer(many=True)