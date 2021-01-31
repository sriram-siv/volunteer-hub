import string
import random

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound, PermissionDenied

from .models import Room
from .serializers.common import RoomSerializer
from .serializers.populated import PopulatedRoomSerializer

# TODO consider where to define these: Room model?
def add_to_room(room_name, campaign_id, member_id):
        room_to_add_member = Room.objects.get(name=room_name, campaign=campaign_id)
        room_to_add_member.members.add(member_id)
        room_to_add_member.save()

def remove_from_room(room_name, campaign_id, member_id):
        room_to_add_member = Room.objects.get(name=room_name, campaign=campaign_id)
        room_to_add_member.members.remove(member_id)
        room_to_add_member.save()


def random_id():
    current_ids = [room.id for room in Room.objects.all()]
    room_id = ''
    while (room_id in current_ids or room_id == ''):
        chars = list(string.ascii_letters) + [str(num) for num in range(10)]
        room_id = ''.join(random.choice(chars) for i in range(8))
    return room_id

class RoomListView(APIView):
    ''' Handles Requests to /rooms '''

    def get(self, _request):
        room_list = Room.objects.all()
        serialized_room_list = RoomSerializer(room_list, many=True)
        return Response(serialized_room_list.data, status=status.HTTP_200_OK)

    def post(self, request):
        request.data['id'] = random_id()
        room_to_create = RoomSerializer(data=request.data)
        if room_to_create.is_valid():
            room_to_create.save()
            return Response(room_to_create.data, status=status.HTTP_201_CREATED)
        return Response(room_to_create.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

class RoomDetailView(APIView):
    ''' Handles Requests to /rooms/:room_name '''

    def get_room(self, pk):
        print(pk)
        try:
            return Room.objects.get(pk=pk)
        except Room.DoesNotExist:
            raise NotFound()

    def is_member(self, room, user):
        if user not in room.members.all():
            raise PermissionDenied()

    def get(self, request, pk):
        room = self.get_room(pk=pk)
        self.is_member(room, request.user)
        serialized_room = PopulatedRoomSerializer(room)
        return Response(serialized_room.data, status=status.HTTP_200_OK)