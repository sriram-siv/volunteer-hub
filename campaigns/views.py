from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound, PermissionDenied
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from .models import Campaign
from .serializers.common import CampaignSerializer
from .serializers.populated import PopulatedCampaignSerializer

class CampaignListView(APIView):
    ''' Handles Requests to /campaigns '''

    permission_classes = (IsAuthenticatedOrReadOnly,)

    def get(self, _request):
        campaign_list = Campaign.objects.all()
        serialized_campaign_list = PopulatedCampaignSerializer(campaign_list, many=True)
        return Response(serialized_campaign_list.data, status=status.HTTP_200_OK)

    def post(self, request):
        request.data['coordinator'] = request.user.id
        campaign_to_create = CampaignSerializer(data=request.data)
        if campaign_to_create.is_valid():
            campaign_to_create.save()
            return Response(campaign_to_create.data, status=status.HTTP_201_CREATED)
        return Response(campaign_to_create.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)


class CampaignDetailView(APIView):
    ''' Handles requests to /campaigns/:campaign_id '''

    permission_classes = (IsAuthenticatedOrReadOnly, )

    def get_campaign(self, pk):
        try:
            return Campaign.objects.get(pk=pk)
        except Campaign.DoesNotExist:
            raise NotFound()

    def get(self, request, pk):
        campaign = self.get_campaign(pk=pk)
        serialized_campaign = PopulatedCampaignSerializer(campaign)
        return Response(serialized_campaign.data, status=status.HTTP_200_OK)
