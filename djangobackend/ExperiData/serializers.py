from .models import ExperiData
from rest_framework import serializers
	
class ExperiDataSerializer(serializers.ModelSerializer):
	dataType = serializers.CharField(max_length=500, required=True)
	testTime = serializers.CharField(max_length=500, required=True)
	createdAt = serializers.CharField(max_length=500, required=True)
	processId = serializers.CharField(max_length=500, required=True)
	sampleId = serializers.CharField(max_length=500, required=True)
	dataName = serializers.CharField(max_length=500, required=True)
	rank = serializers.CharField(max_length=500)
	data = serializers.FileField(required=True)

	class Meta:
		model = ExperiData
		fields = "__all__"
