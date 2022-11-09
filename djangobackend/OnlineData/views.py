from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import OnlineData
from .serializers import OnlineDataSerializer


# Create your views here.
class OnlineView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = OnlineDataSerializer(data=request.data)
        if serializer.is_valid() is False:
            return Response({'message': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        serializer.save()
        return Response('成功')
