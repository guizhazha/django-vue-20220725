from .models import OnlineData
from rest_framework import serializers
	
class OnlineDataSerializer(serializers.ModelSerializer):
	datatype = serializers.CharField(max_length=500, required=True)
	fileName = serializers.CharField(max_length=500, required=True)
	createdAt = serializers.CharField(max_length=500, required=True)
	describe = serializers.CharField(max_length=500, required=True)

	class Meta:
		model = OnlineData
		fields = '__all__'