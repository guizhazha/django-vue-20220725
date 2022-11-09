from django.shortcuts import render
from django.core import serializers 
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import ChatData
from systemData.models import UserInfo
from .serializers import ChatDataSerializer

class SendMessageView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = ChatDataSerializer(data=request.data)
        if serializer.is_valid() is False:
            return Response({'message': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        serializer.save()
        data_dict = serializer.data
        return Response(data_dict)

class GetMessageView(APIView):
    def post(self, request, *args, **kwargs):
        chats = ChatData.objects.filter(toCard=request.data['card'], isRead=False)
        response = []
        for chat in chats:
            response.append(
                {
                    'id': chat.id,
                    'sendCard': chat.sendCard,
                    'sendName': UserInfo.objects.get(card=chat.sendCard).name,
                    'messageTime': chat.messageTime,
                    'message': chat.message,
                    'isRead': chat.isRead
                }
            )

        return Response(response)

class ReadView(APIView):
    def post(self, request, *args, **kwargs):
        chats = ChatData.objects.get(id=request.data['id'])
        chats.isRead = True
        chats.save()
        return Response('成功')