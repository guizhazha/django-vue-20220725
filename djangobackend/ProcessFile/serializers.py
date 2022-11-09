from .models import ProcessFile
from rest_framework import serializers
	
class ProcessFileSerializer(serializers.ModelSerializer):
	createdAt = serializers.CharField(max_length=500, required=True)
	processId = serializers.CharField(max_length=500, required=True)
	fileName = serializers.CharField(max_length=500, required=True)
	
	class Meta:
		model = ProcessFile
		fields = "__all__"