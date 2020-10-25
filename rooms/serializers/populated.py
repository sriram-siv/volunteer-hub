from rest_framework import serializers
from ..models import Room
from jwt_auth.serializers.nested import NestedUserSerializer
from chat_messages.serializers.nested import NestedChatMessageSerializer
from campaigns.serializers.nested import NestedCampaignSerializer
from ..serializers.common import RoomSerializer

class PopulatedRoomSerializer(RoomSerializer):

    messages = NestedChatMessageSerializer(many=True)
    members = NestedUserSerializer(many=True)
    campaign = NestedCampaignSerializer()
