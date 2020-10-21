from ..serializers.common import UserSerializer
from campaigns.serializers.common import CampaignSerializer

class PopulatedUserSerializer(UserSerializer):
    coord_campaigns = CampaignSerializer(many=True)
    campaigns = CampaignSerializer(many=True)