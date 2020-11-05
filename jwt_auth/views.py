from datetime import datetime, timedelta
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import PermissionDenied, NotFound
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from django.contrib.auth import get_user_model
from django.conf import settings
import jwt

from .serializers.common import UserSerializer, ProfileSerializer
from .serializers.populated import PopulatedUserSerializer

User = get_user_model()

class RegisterView(APIView):

    ''' Handles requests to /auth/register '''

    def post(self, request):
        user_to_create = UserSerializer(data=request.data)
        if user_to_create.is_valid():
            user_to_create.save()
            return Response({'message': 'Registration Successful'}, status=status.HTTP_201_CREATED)
        print(user_to_create.errors)
        return Response(user_to_create.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

class LoginView(APIView):

    ''' Handles requetsts to /auth/login '''

    def get_user(self, email):
        try:
            return User.objects.get(email=email)
        except User.DoesNotExist:
            raise PermissionDenied(detail='Invalid Credentials')

    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        user_to_login = self.get_user(email=email)
        if not user_to_login.check_password(password):
            raise PermissionDenied(detail='Invalid Credentials')
        dt = datetime.now() + timedelta(days=7)
        token = jwt.encode(
            {'sub': user_to_login.id, 'exp': int(dt.strftime('%s'))},
            settings.SECRET_KEY,
            algorithm='HS256')
        return Response({'token': token, 'id': user_to_login.id, 'message': f'Welcome Back {user_to_login.username}'})

class ProfileListView(APIView):

    ''' Handles requests to /profiles '''

    def get(self, _request):
        profile_list = User.objects.all()
        serialized_profile_list = PopulatedUserSerializer(profile_list, many=True)
        return Response(serialized_profile_list.data, status=status.HTTP_200_OK)


class ProfileDetailView(APIView):

    ''' Handles requests to /profiles/:profile_id '''

    permission_classes = (IsAuthenticatedOrReadOnly,)

    def get_profile(self, pk):
        try:
            return User.objects.get(pk=pk)
        except User.DoesNotExist:
            raise NotFound()

    def is_user(self, profile, user):
        if profile.id != user.id:
            raise PermissionDenied()
    
    def get(self, _request, pk):
        profile = self.get_profile(pk=pk)
        serialized_profile = PopulatedUserSerializer(profile)
        return Response(serialized_profile.data, status=status.HTTP_200_OK)

    def put(self, request, pk):
        profile_to_update = self.get_profile(pk=pk)
        self.is_user(profile_to_update, request.user)
        print(request.data)
        updated_profile = ProfileSerializer(profile_to_update, data=request.data)
        if updated_profile.is_valid():
            updated_profile.save()
            return Response(updated_profile.data, status=status.HTTP_202_ACCEPTED)
        return Response(updated_profile.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

    def delete(self, request, pk):
        profile_to_delete = self.get_profile(pk=pk)
        self.is_user(profile_to_delete, request.user)
        profile_to_delete.delete()
        return Response({ 'message': 'Profile Deleted' }, status=status.HTTP_204_NO_CONTENT)

class ProfileSkillsView(ProfileDetailView):
    ''' handles requests to /profiles/:profile_id/skills '''

    permission_classes = (IsAuthenticated,)

    def put(self, request, pk):
        profile_update = self.get_profile(pk=pk)
        self.is_user(profile_update, request.user)
        profile_update.user_skills.clear()
        updated_skills = request.data['user_skills']
        for skill in updated_skills:
            profile_update.user_skills.add(skill)
        return Response({ 'message': 'Skills updated' })


class ProfileShiftView(ProfileDetailView):
    ''' handles requests to /profiles/:profile_id/shifts '''

    def put(self, request, pk):
        profile_to_update_shifts = self.get_profile(pk=pk)
        self.is_user(profile_to_update_shifts, request.user)
        new_shifts = request.data['schedule']
        for i in range(len(new_shifts)):
            if new_shifts[i]:
                profile_to_update_shifts.user_shifts.add(i + 1)
            else:
                profile_to_update_shifts.user_shifts.remove(i + 1)
        return Response({ 'message': 'Shifts updated' }, status=status.HTTP_202_ACCEPTED)
        