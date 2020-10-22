from ..serializers.common import UserSerializer
from campaigns.serializers.common import CampaignSerializer

class PopulatedUserSerializer(UserSerializer):
    coord_campaigns = CampaignSerializer(many=True)
    pend_campaigns = CampaignSerializer(many=True)
    conf_campaigns = CampaignSerializer(many=True)