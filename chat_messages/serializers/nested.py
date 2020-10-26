from rest_framework import serializers
from ..serializers.common import ChatMessageSerializer
from jwt_auth.serializers.nested import NestedUserSerializer

class NestedChatMessageSerializer(ChatMessageSerializer):
    user = NestedUserSerializer()
