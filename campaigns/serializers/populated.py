from rest_framework import serializers
from ..serializers.common import CampaignSerializer
from jwt_auth.serializers.nested import NestedUserSerializer
from skills.serializers.nested import NestedSkillSerializer
from rooms.serializers.common import RoomSerializer
from notices.serializers.nested import NestedNoticeSerializer

class PopulatedCampaignSerializer(CampaignSerializer):

    owner = NestedUserSerializer()
    pend_volunteers = NestedUserSerializer(many=True)
    conf_volunteers = NestedUserSerializer(many=True)
    campaign_skills = NestedSkillSerializer(many=True)
    message_rooms = RoomSerializer(many=True)
    coordinators = NestedUserSerializer(many=True)
    campaign_notices = NestedNoticeSerializer(many=True)