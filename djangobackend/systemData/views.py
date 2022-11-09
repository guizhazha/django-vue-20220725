from venv import create
from django.shortcuts import render, get_object_or_404
# pip install djangorestframework
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import UserInfo
from ExperiData.models import ExperiData
from ProcessFile.models import ProcessFile
from OnlineData.models import OnlineData
from .serializers import UserInfoSerializer

import smtplib
from email.mime.text import MIMEText

# Create your views here.
class LoginView(APIView):
    def post(self, request, *args, **kwargs):
        print(request.data)
        try:
            user = UserInfo.objects.get(card=request.data['card'], password=request.data['password'])
            return Response(
                {
                    'name': user.name,
                    'card': user.card
                }
            )
        except Exception as error:
            return Response({'message': str(error)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class RegisterView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = UserInfoSerializer(data=request.data)
        if serializer.is_valid() is False:
            return Response({'message': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        serializer.save()
        user_dict = serializer.data
        return Response(user_dict)

class SendPassword(APIView):
    def post(self, request, *args, **kwargs):
        try:
            user = UserInfo.objects.get(card=request.data['card'])
            send(user)
            return Response('已向您的邮箱发送密码！')
        except Exception as error:
            return Response({'message': str(error)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

def send(user):
    subject = "您的密码是："#邮件标题
    sender = "bistuserve@163.com"#发送方
    content = user.password
    recver = user.email#接收方
    # password = "123456asdASD!"#邮箱密码
    # CGMUXGLYQAYUGZFL
    password = "CGMUXGLYQAYUGZFL" #是授权码不是密码

    message = MIMEText(content,"plain","utf-8")
    #content 发送内容     "plain"文本格式   utf-8 编码格式
    
    message['Subject'] = subject #邮件标题
    message['To'] = recver #收件人
    message['From'] = sender #发件人
    print('发送')
    smtp = smtplib.SMTP_SSL("smtp.163.com",994) #实例化smtp服务器
    print('发送')
    smtp.login(sender,password)#发件人登录
    print('发送')
    smtp.sendmail(sender,[recver],message.as_string()) #as_string 对 message 的消息进行了封装
    print('发送')
    smtp.close()
    print('发送')
 
# GET - 从指定的资源请求数据
# POST - 向指定的资源提交要被处理的数据

class GetInfo(APIView):
    def post(self, request, *args, **kwargs):
        user = UserInfo.objects.get(card=request.data['card'])
        return Response(
            {
                'name': user.name,
                'card': user.card, 
                'school': user.school,
                'phone': user.phone,
                'email': user.email,
                'role': user.role,
                'password': user.password
            }
        )

class GetInfos(APIView):
    def post(self, request, *args, **kwargs):
        responses = []
        users = UserInfo.objects.all()

        for user in users:
            response = {
                'card': user.card,
                'name': user.name,
                'school': user.school,
                'phone': user.phone,
                'email': user.email,
                'password': user.password,
                'role': user.role,
                'isManager': user.isManager,
                'createdAt': user.createdAt,
                'ExperiNum': len(ExperiData.objects.filter(userInfo_id=user.card)),
                'ProcessNum': len(ProcessFile.objects.filter(userInfo_id=user.card)),
            }
            responses.append(response)

        return Response(responses)

class GetRole(APIView):
    def post(self, request, *args, **kwargs):
        user = UserInfo.objects.get(card=request.data['card'])
        return Response({'role': user.role})

class GetUserNumber(APIView):
    def post(self, request, *args, **kwargs):
        users = UserInfo.objects.all()
        manager = UserInfo.objects.filter(isManager=True)
        teacher = UserInfo.objects.filter(role='teacher')
        response = {
            'userNumber': len(users),
            'managerNumber': len(manager),
            'teacherNumber': len(teacher)
        }
        return Response(response)

class GetDataNumber(APIView):
    def post(self, request, *args, **kwargs):
        expris = ExperiData.objects.all()
        pros = ProcessFile.objects.all()
        onlines = OnlineData.objects.all()
        response = {
            'exprisNumber': len(expris),
            'prosNumber': len(pros),
            'onlinesNumber': len(onlines)
        }
        return Response(response)

class ChangeSchool(APIView):
    def post(self, request, *args, **kwargs):
        user = UserInfo.objects.get(card=request.data['card'])
        user.school = request.data['school']
        user.save()
        return Response('修改成功')

class ChangePassword(APIView):
    def post(self, request, *args, **kwargs):
        user = UserInfo.objects.get(card=request.data['card'])
        user.password = request.data['password']
        user.save()
        return Response('修改成功')

class ChangeEmail(APIView):
    def post(self, request, *args, **kwargs):
        user = UserInfo.objects.get(card=request.data['card'])
        user.email = request.data['email']
        user.save()
        return Response('修改成功')

class ChangePhone(APIView):
    def post(self, request, *args, **kwargs):
        user = UserInfo.objects.get(card=request.data['card'])
        user.phone = request.data['phone']
        user.save()
        return Response('修改成功')

class ChangeRole(APIView):
    def post(self, request, *args, **kwargs):
        user = UserInfo.objects.get(card=request.data['card'])
        user.role = request.data['role']
        user.save()
        return Response('修改成功')

class ChangeManager(APIView):
    def post(self, request, *args, **kwargs):
        user = UserInfo.objects.get(card=request.data['card'])
        user.isManager = not user.isManager
        user.save()
        return Response('修改成功')


class GetTodayInfo(APIView):
    def post(self, request, *args, **kwargs):
        responses = []

        users = UserInfo.objects.filter(createdAt=request.data['day'])
        response = {
            'dataTable': 'UserInfo',
            'number': len(users),
            'description': '新注册了' + str(len(users)) + '位用户'
        }
        responses.append(response)

        expris = ExperiData.objects.filter(createdAt=request.data['day'])
        response = {
            'dataTable': 'ExperiData',
            'number': len(expris),
            'description': '上传了' + str(len(expris)) + '份实验数据'
        }
        responses.append(response)

        pros = ProcessFile.objects.filter(createdAt=request.data['day'])
        response = {
            'dataTable': 'ProcessFile',
            'number': len(pros),
            'description': '上传了' + str(len(pros)) + '份工艺文件'
        }
        responses.append(response)

        onlines = OnlineData.objects.filter(createdAt=request.data['day'])
        response = {
            'dataTable': 'OnlineData',
            'number': len(onlines),
            'description': '在线处理了' + str(len(onlines)) + '份数据'
        }
        responses.append(response)

        return Response(responses)