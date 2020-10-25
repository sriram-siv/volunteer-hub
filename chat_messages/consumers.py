import json
import jwt
from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer
from django.conf import settings
from django.contrib.auth import get_user_model
User = get_user_model()

from .serializers.common import ChatMessageSerializer 

class ChatMessageConsumer(WebsocketConsumer):
    def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = 'chat_%s' % self.room_name

        # Join room group
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )

        self.accept()

    def disconnect(self, close_code):
        # Leave room group
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name,
            self.channel_name
        )

    # Receive message from WebSocket
    def receive(self, text_data):
        text_data_json = json.loads(text_data)

        token = text_data_json["user_id"].replace('Bearer ', '')

        try:
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
            user = User.objects.get(pk=payload.get('sub'))
        except jwt.exceptions.InvalidTokenError:
            raise PermissionDenied(detail='Invalid Authorization Token')
        except User.DoesNotExist:
            raise PermissionDenied(detail='User Not Found')

        text_data_json["user_id"] = user.username

        #TODO Add message to DB
        message_to_save = {
            "text": text_data_json["text"],
            "user_id": user.id,
            "room_id": text_data_json["room_id"],
        }
        serialized_message = ChatMessageSerializer(data=message_to_save)
        if serialized_message.is_valid():
            serialized_message.save()
        


        # Send message to room group
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': text_data_json
            }
        )

    # Receive message from room group
    def chat_message(self, event):
        message = event['message']

        # Send message to WebSocket
        self.send(text_data=json.dumps({
            'message': message
        }))