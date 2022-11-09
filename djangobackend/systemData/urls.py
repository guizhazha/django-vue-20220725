from django.urls import path
from .views import LoginView, RegisterView, SendPassword, \
    GetInfo, GetInfos, GetRole,GetUserNumber, GetDataNumber,\
    ChangeSchool, ChangePassword, ChangeEmail, ChangePhone, ChangeRole, \
    ChangeManager, \
    GetTodayInfo

# from django.conf.urls import url
from django.urls import re_path as url
from django.conf import settings
from django.views.static import serve

urlpatterns = [
    path('login/', LoginView.as_view()),
    path('register/', RegisterView.as_view()),

    path('sendPassword/', SendPassword.as_view()),

    path('getInfo/', GetInfo.as_view()),
    path('getInfos/', GetInfos.as_view()),
    path('getRole/', GetRole.as_view()),
    path('getUserNumber/', GetUserNumber.as_view()),
    path('getDataNumber/', GetDataNumber.as_view()),

    path('changeSchool/', ChangeSchool.as_view()),
    path('changePassword/', ChangePassword.as_view()),
    path('changeEmail/', ChangeEmail.as_view()),
    path('changePhone/', ChangePhone.as_view()),
    path('changeRole/', ChangeRole.as_view()),
    path('changeManager/', ChangeManager.as_view()),

    path('getTodayInfo/', GetTodayInfo.as_view()),
]