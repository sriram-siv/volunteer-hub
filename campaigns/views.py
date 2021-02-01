from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound, PermissionDenied
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated

from .models import Campaign
from .serializers.common import CampaignSerializer
from .serializers.populated import PopulatedCampaignSerializer
from .serializers.index import IndexSerializer
from rooms.models import Room
from rooms.serializers.common import RoomSerializer
from rooms.views import add_to_room, remove_from_room, random_id

class CampaignListView(APIView):
    ''' Handles Requests to /campaigns '''

    permission_classes = (IsAuthenticatedOrReadOnly,)

    def get(self, _request):
        print('fetching campaigns')
        campaign_list = Campaign.objects.all()
        serialized_campaign_list = IndexSerializer(campaign_list, many=True)
        return Response(serialized_campaign_list.data, status=status.HTTP_200_OK)

    def post(self, request):
        request.data['owner'] = request.user.id
        campaign_to_create = CampaignSerializer(data=request.data)
        if campaign_to_create.is_valid():
            campaign_to_create.save()
            rooms_to_create = [
                {'id': random_id(), 'name': 'All', 'members': [request.user.id], 'campaign': campaign_to_create.data['id']},
                {'id': random_id(), 'name': 'Coordinators', 'members': [request.user.id], 'campaign': campaign_to_create.data['id']}
            ]
            serialized_rooms = RoomSerializer(data=rooms_to_create, many=True)
            if serialized_rooms.is_valid():
                serialized_rooms.save()
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

    def get_user_status(self, campaign, user):
        if campaign.owner == user:
            return 3
        if user in campaign.coordinators.all():
            return 2
        if user in campaign.conf_volunteers.all():
            return 1
        return 0

    def check_user_perm(self, campaign, user, status):
        perm_levels = {
            'owner': 3,
            'coordinator': 2,
            'confirmed': 1
        }
        if self.get_user_status(campaign, user) < perm_levels[status]:
            raise PermissionDenied()

    def get(self, request, pk):
        campaign = self.get_campaign(pk=pk)
        self.check_user_perm(campaign, request.user, 'confirmed')
        if self.get_user_status(campaign, request.user) > 1:
            serialized_campaign = PopulatedCampaignSerializer(campaign)
        else:
            serialized_campaign = CampaignSerializer(campaign)
        return Response(serialized_campaign.data, status=status.HTTP_200_OK)

    def put(self, request, pk):
        campaign_to_update = self.get_campaign(pk=pk)
        self.check_user_perm(campaign_to_update, request.user, 'owner')
        updated_campaign = CampaignSerializer(campaign_to_update, data=request.data)
        if updated_campaign.is_valid():
            updated_campaign.save()
            return Response(updated_campaign.data, status=status.HTTP_202_ACCEPTED)
        return Response(updated_campaign.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

    def delete(self, request, pk):
        campaign_to_delete = self.get_campaign(pk=pk)
        self.check_user_perm(campaign_to_delete, request.user, 'owner')
        campaign_to_delete.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class CampaignVolunteerView(CampaignDetailView):
    ''' Handles requests to /campaigns/:campaign_id/volunteers '''

    permission_classes = (IsAuthenticated,)

    # OWNER MOVES VOLUNTEER FROM PENDING TO CONFIRMED
    def put(self, request, pk):
        # TODO update frontend implementation
        campaign_to_update = self.get_campaign(pk=pk)
        volunteer_id = request.data['volunteer_id']
        action = request.data['action']

        if request.user.id != volunteer_id or action == 'confirm':
            self.check_user_perm(campaign_to_update, request.user, 'coordinator')         

        if action == 'add':
            campaign_to_update.pend_volunteers.add(volunteer_id)

        if action == 'confirm':
            campaign_to_update.conf_volunteers.add(volunteer_id)
            campaign_to_update.pend_volunteers.remove(volunteer_id)
            add_to_room(room_name='All', campaign_id=pk, member_id=volunteer_id)

        if action == 'delete':
            campaign_to_update.pend_volunteers.remove(volunteer_id)
            campaign_to_update.conf_volunteers.remove(volunteer_id)
            campaign_to_update.coordinators.remove(volunteer_id)
            rooms = Room.objects.filter(campaign=campaign_to_update, members=volunteer_id)
            for room in rooms:
                remove_from_room(room_name=room.name, campaign_id=pk, member_id=volunteer_id)

        return Response({ 'message': 'User lists updated' }, status=status.HTTP_202_ACCEPTED)

class CampaignCoordinatorView(CampaignDetailView):
    ''' Handles requests to /campaigns/:campaign_id/coordinators '''

    # OWNER ADDS/REMOVES COORDINATOR

    def put(self, request, pk):
        campaign = self.get_campaign(pk=pk)
        self.check_user_perm(campaign, request.user, 'owner')
        coordinator_id = request.data['coordinator_id']
        confirm = request.date['confirm']
        message = ''
        if (confirm):
            add_to_room('Coordinators', pk, coordinator_id)
            campaign.coordinators.add(coordinator_id)
            message = 'User added as coordinator'
        else:
            remove_from_room('Coordinators', pk, coordinator_id)
            campaign.coordinators.remove(coordinator_id)
            message = 'User removed as coordinator'
        
        return Response({ 'message': message }, status=status.HTTP_202_ACCEPTED)

class CampaignSkillView(CampaignDetailView):
    ''' Handles requests to /campaigns/:campaign_id/skills '''

    permission_classes = (IsAuthenticated,)

    def put(self, request, pk):
        campaign_to_update = self.get_campaign(pk=pk)
        self.check_user_perm(campaign_to_update, request.user, 'owner')
        campaign_to_update.campaign_skills.set(request.data['campaign_skills'])
        return Response({ 'message': 'Skills updated' }, status=status.HTTP_202_ACCEPTED)

    




