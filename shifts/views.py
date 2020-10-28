from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import Shift
from .serializers.common import ShiftSerializer

class ShiftListView(APIView):
    ''' Handles requests to /skills '''

    def get(self, _request):
        shift_list = Shift.objects.all()
        serialized_shift_list = ShiftSerializer(shift_list, many=True)
        return Response(serialized_shift_list.data, status=status.HTTP_200_OK)