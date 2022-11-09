from .models import UserInfo, RelaNumber
from rest_framework import serializers
from rest_framework.validators import UniqueValidator

class UserInfoSerializer(serializers.ModelSerializer):
	name = serializers.CharField(max_length=500, required=True)
	card = serializers.CharField(max_length=200, required=True, validators=[UniqueValidator(queryset=UserInfo.objects.all())])
	school = serializers.CharField(max_length=500, required=True)
	password = serializers.CharField(max_length=500, required=True)
	email = serializers.EmailField(required=True)
	phone = serializers.CharField(max_length=500, required=True)
	role = serializers.CharField(max_length=500, required=True)

	class Meta:
		model = UserInfo
		fields = "__all__"

class RelaNumberSerializer(serializers.ModelSerializer):
	class Meta:
		model = RelaNumber
		fields = "__all__"