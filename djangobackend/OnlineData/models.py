from pydoc import describe
from django.db import models

from systemData.models import UserInfo

# Create your models here.
class OnlineData(models.Model):
    userInfo = models.ForeignKey(UserInfo, to_field="card", on_delete=models.CASCADE)
    
    datatype = models.CharField(max_length=500)
    fileName = models.CharField(max_length=500)
    createdAt = models.CharField(max_length=500)
    describe = models.CharField(max_length=500)

    class Meta:
        ordering = ['datatype', '-createdAt']
