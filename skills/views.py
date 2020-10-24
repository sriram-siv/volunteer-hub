from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView

from .models import Skill
from .serializers.common import SkillSerializer 


class SkillsListView(APIView):
    ''' Handles requests to /skills '''

    def get(self, _request):
        skill_list = Skill.objects.all()
        print(skill_list)
        serialized_skill_list = SkillSerializer(skill_list, many=True)
        return Response(serialized_skill_list.data, status=status.HTTP_200_OK)