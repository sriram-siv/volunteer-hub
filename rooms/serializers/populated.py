from rest_framework import serializers
from ..models import Room
from jwt_auth.serializers.nested import NestedUserSerializer
from chat_messages.serializers.common import ChatMessageSerializer
from campaigns.serializers.common import CampaignSerializer

class PopulatedRoomSerializer(serializers.ModelSerializer):

    messages = ChatMessageSerializer(many=True)
    members = NestedUserSerializer(many=True)
    campaign = CampaignSerializer()
