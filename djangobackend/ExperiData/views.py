from django.shortcuts import render
from django.core import serializers 
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import ExperiData
from ProcessFile.models import ProcessFile
from systemData.models import UserInfo, RelaNumber
from .serializers import ExperiDataSerializer

import os

# Create your views here.
class CheckView(APIView):
    def post(self, request, *args, **kwargs):
        try:
            expri = ExperiData.objects.get(userInfo_id=request.data['userInfo'], dataType=request.data['dataType'], dataName=request.data['dataName'])
            return Response({'dataType': expri.dataType})
        except Exception as error:
            return Response({'message': str(error)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class UploadView(APIView):
    def post(self, request, *args, **kwargs):
        # ExperiData.objects.all().delete()
        serializer = ExperiDataSerializer(data=request.data)
        if serializer.is_valid() is False:
            return Response({'message': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        serializer.save()
        data_dict = serializer.data
        return Response(data_dict)


class UpdateRankView(APIView):
    def post(self, request, *args, **kwargs):
        expri = ExperiData.objects.get(userInfo_id=request.data['card'], dataType=request.data['dataType'], dataName=request.data['dataName'])
        expri.rank = request.data['rank']
        expri.save()
        return Response({'rank': expri.rank, 'card': expri.userInfo_id})

class UpdatePublicView(APIView):
    def post(self, request, *args, **kwargs):
        expri = ExperiData.objects.get(id=request.data['id'])
        expri.isPublic = request.data['isPublic']
        expri.save()
        return Response({'isPublic': expri.isPublic, 'card': expri.userInfo_id})


def getData(path):
    with open('{}/media/{}'.format(os.getcwd(), path), 'r') as f:
        return f.readlines()

def getFile(card, processId):
    try:
        file =  ProcessFile.objects.get(userInfo_id=card, processId=processId)

        try:
            with open('{}/media/{}'.format(os.getcwd(), file.file), 'r') as f:
                file = f.readlines()
                f.close()
                return file
        except:
            return '请上传对应的工艺文件'
    except:
        return '请上传对应的工艺文件'

class UnshowView(APIView):
    def post(self, request, *args, **kwargs):
        expri = ExperiData.objects.get(id=request.data['id'])
        if expri.userInfo_id == request.data['card']:
            expri.isShow = False
            expri.save()

        return Response('已删除')

class GetDataView(APIView):
    def post(self, request, *args, **kwargs):
        if request.data['card'] == 'superAdmin':
            expris = ExperiData.objects.filter(dataType=request.data['dataType'])
            return Response(getResponse(expris, True))
        else:
            user = UserInfo.objects.get(card=request.data['card'])
            
            if user.isManager:
                expris = ExperiData.objects.filter(dataType=request.data['dataType'], isShow=True)
                return Response(getResponse(expris, True))
            
            else:
                studentAndSelf = []
                studentAndSelf.append(request.data['card'])

                if user.role == 'teacher':
                    students = RelaNumber.objects.filter(userInfo_id=request.data['card'])

                    if len(students):
                        studentAndSelf.append(student.number for student in students)


                expris = ExperiData.objects.filter(userInfo_id__in=studentAndSelf, dataType=request.data['dataType'], isShow=True)
                response = getResponse(expris, True)

                expris = ExperiData.objects.filter(dataType=request.data['dataType'], isPublic=True, isShow=True).exclude(userInfo_id__in=studentAndSelf).all()
                if len(expris):
                    response.extend(getResponse(expris, False))
                
                return Response(response)

def getResponse(expris, hasPrivilege):
    responses = []
    for expri in expris:
        response = {
            'id': expri.id,
            # 学号姓名
            'card': expri.userInfo.card,
            'name': expri.userInfo.name,
            # 时间
            'testTime': expri.testTime,
            'createdAt': expri.createdAt,
            # 工艺号,样品号,等级
            'processId': expri.processId,
            'sampleId': expri.sampleId,
            'rank': expri.rank,
            # 附加信息:名称,图片,工艺文件
            'dataName': expri.dataName,
            'data': getData(expri.data),
            'file': getFile(expri.userInfo.card, expri.processId),
            # 是否公开显示
            'isPublic': expri.isPublic,
            'isShow': expri.isShow,

            # 是否具有权限
            'hasPrivilege': hasPrivilege,
        }
        responses.append(response)
    
    return responses