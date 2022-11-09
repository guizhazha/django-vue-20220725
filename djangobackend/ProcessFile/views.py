from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import ProcessFile
from .serializers import ProcessFileSerializer


# Create your views here.
class UploadView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = ProcessFileSerializer(data=request.data)
        if serializer.is_valid() is False:
            return Response({'message': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        serializer.save()
        file_dict = serializer.data
        return Response(file_dict)