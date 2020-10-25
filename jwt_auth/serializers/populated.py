from ..serializers.common import UserSerializer
from campaigns.serializers.nested import NestedCampaignSerializer
from skills.serializers.nested import NestedSkillSerializer
from rooms.serializers.nested import NestedRoomSerializer

class PopulatedUserSerializer(UserSerializer):
    owned_campaigns = NestedCampaignSerializer(many=True)
    pend_campaigns = NestedCampaignSerializer(many=True)
    conf_campaigns = NestedCampaignSerializer(many=True)
    user_skills = NestedSkillSerializer(many=True)
    message_rooms = NestedRoomSerializer(many=True)
    coord_campaigns = NestedCampaignSerializer(many=True)