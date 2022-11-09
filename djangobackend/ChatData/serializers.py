from .models import ChatData
from rest_framework import serializers
	
class ChatDataSerializer(serializers.ModelSerializer):
	sendCard = serializers.CharField(max_length=500, required=True)
	toCard = serializers.CharField(max_length=500, required=True)
	messageTime = serializers.CharField(max_length=500, required=True)
	message = serializers.CharField(max_length=1000, required=True)
	isRead = serializers.BooleanField(default=False)

	class Meta:
		model = ChatData
		fields = "__all__"
