from django.db import models

# Create your models here.
class ChatData(models.Model):
    sendCard = models.CharField(max_length=500)
    toCard = models.CharField(max_length=500)
    messageTime = models.CharField(max_length=500)
    message = models.CharField(max_length=1000)
    isRead = models.BooleanField(default=False)
