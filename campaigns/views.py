from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound, PermissionDenied
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated

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

    def is_coordinator(self, campaign, user):
        if campaign.coordinator.id != user.id:
            raise PermissionDenied()

    def get(self, request, pk):
        campaign = self.get_campaign(pk=pk)
        serialized_campaign = PopulatedCampaignSerializer(campaign)
        return Response(serialized_campaign.data, status=status.HTTP_200_OK)

    def put(self, request, pk):
        campaign_to_update = self.get_campaign(pk=pk)
        self.is_coordinator(campaign_to_udpate, request.user)
        updated_campaign = CampaignSerializer(campaign_to_update, data=request.data)
        if updated_campaign.is_valid():
            updated_campaign.save()
            return Response(updated_campaign.data, status=status.HTTP_202_ACCEPTED)
        return Response(updated_campaign.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

    def delete(self, request, pk):
        campaign_to_delete = self.get_campaign(pk=pk)
        self.is_coordinator(campaign_to_delete, request.user)
        campaign_to_delete.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class CampaignVolunteerView(CampaignDetailView):
    ''' Handles requests to /campaigns/:campaign_id/volunteers '''

    permission_classes = (IsAuthenticated,)

    # USER ADDS SELF TO PENDING VOLUNTEER 
    def post(self, request, pk):
        campaign_to_volunteer = self.get_campaign(pk=pk)
        campaign_to_volunteer.pend_volunteers.add(request.user.id)
        campaign_to_volunteer.save()
        return Response({ 'message': f'Volunteer added to campaign {pk}' }, status=status.HTTP_202_ACCEPTED)

    # COORDINATOR MOVES VOLUNTEER FROM PENDING TO CONFIRMED
    def put(self, request, pk):
        campaign_to_update = self.get_campaign(pk=pk)
        self.is_coordinator(campaign_to_update, request.user)
        volunteer_id = request.data['volunteer_id']
        campaign_to_update.pend_volunteers.remove(volunteer_id)
        campaign_to_update.conf_volunteers.add(volunteer_id)
        campaign_to_update.save()
        return Response({ 'message': f'Volunteer {volunteer_id} confirmed' }, status=status.HTTP_202_ACCEPTED)

    # COORDINATOR OR USER CAN REMOVE THEMSELVES FROM PROJECT
    def delete(self, request, pk):
        # if owner is true OR if volunteer_id == request.user.id remove. Otherwise returned permissiondenied
        campaign_to_update = self.get_campaign(pk=pk)
        volunteer_id = request.data['volunteer_id']
        if (request.user.id == campaign_to_update.coordinator.id or request.user.id == volunteer_id):
            campaign_to_update.pend_volunteers.remove(volunteer_id)
            campaign_to_update.conf_volunteers.remove(volunteer_id)
            campaign_to_update.save()
            return Response(
                { 'message': f'Volunteer {volunteer_id} removed from campaign {campaign_to_update.id}.' }, status=status.HTTP_202_ACCEPTED)
        return Response({ 'message': 'Must be user or coordinator to perform this action.' })

class CampaignSkillView(CampaignDetailView):
    ''' Handles requests to /campaigns/:campaign_id/skills '''

    def post(self, request, pk):
        campaign_to_add_skill = self.get_campaign(pk=pk)
        self.is_coordinator(campaign_to_add_skill, request.user)
        campaign_to_add_skill.campaign_skills.add(request.data['skill_id'])
        campaign_to_add_skill.save()
        return Response({ 'message': 'Skill added to campaign' }, status=status.HTTP_202_ACCEPTED)

    def delete(self, request, pk):
        campaign_to_delete_skill = self.get_campaign(pk=pk)
        self.is_coordinator(campaign_to_delete_skill, request.user)
        campaign_to_delete_skill.campaign_skills.remove(request.data['skill_id'])
        campaign_to_delete_skill.save()
        return Response({ 'message': 'Skill removed from campaign' }, status=status.HTTP_204_NO_CONTENT)
    


