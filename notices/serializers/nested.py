from rest_framework import serializers
from ..serializers.common import NoticeSerializer
from jwt_auth.serializers.nested import NestedUserSerializer

class NestedNoticeSerializer(NoticeSerializer):
    owner = NestedUserSerializer()
