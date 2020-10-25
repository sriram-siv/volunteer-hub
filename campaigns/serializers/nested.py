from rest_framework import serializers
from ..models import Campaign

class NestedCampaignSerializer(serializers.ModelSerializer):

    class Meta:
        model = Campaign
        fields = ('id', 'name')