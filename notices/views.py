from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied, NotFound
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from .serializers.common import NoticeSerializer
from .models import Notice
from campaigns.models import Campaign

class NoticeListView(APIView):
    ''' Handles requests to /notices '''

    permission_classes = (IsAuthenticated,)

    def get_campaign(self, pk):
        try:
            return Campaign.objects.get(pk=pk)
        except Campaign.DoesNotExist():
            raise NotFound()
    
    def is_auth(self, user, campaign):
        is_owner = campaign.owner == user
        is_coord = user in campaign.coordinators.all()
        if not (is_owner or is_coord):
            raise PermissionDenied()

    def post(self, request):
        request.data['owner'] = request.user.id
        campaign_to_notice = self.get_campaign(request.data['campaign'])
        self.is_auth(request.user, campaign_to_notice)
        notice_to_create = NoticeSerializer(data=request.data)
        if notice_to_create.is_valid():
            notice_to_create.save()
            return Response(notice_to_create.data, status=status.HTTP_201_CREATED)
        return Response(notice_to_create.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

class NoticeDetailView(APIView):
    ''' Handles requests to /notices/:notice_id '''

    permission_classes = (IsAuthenticated,)

    def get_notice(self, pk):
        try:
            return Notice.objects.get(pk=pk)
        except Notice.DoesNotExist:
            raise NotFound()
    
    def is_owner(self, notice, user):
        if notice.owner.id != user.id:
            raise PermissionDenied()

    def delete(self, request, pk):
        notice_to_delete = self.get_notice(pk=pk)
        self.is_owner(notice_to_delete, request.user)
        notice_to_delete.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

