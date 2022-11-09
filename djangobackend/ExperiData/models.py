from django.db import models

from systemData.models import UserInfo

# Create your models here.
def ExperiDataPath(instance, filename):
	return "{0}/{1}/{2}/{3}".format("ExperiData", instance.userInfo.card, instance.dataType, filename)
	
class ExperiData(models.Model):
	userInfo = models.ForeignKey(UserInfo, to_field="card", on_delete=models.CASCADE)

	dataType = models.CharField(max_length=500)
	testTime = models.CharField(max_length=500)
	createdAt = models.CharField(max_length=500)
	processId = models.CharField(max_length=500)
	sampleId = models.CharField(max_length=500)
	dataName = models.CharField(max_length=500)
	data = models.FileField(upload_to=ExperiDataPath)
	rank = models.CharField(max_length=500)
	isPublic = models.BooleanField(default=False)
	isShow = models.BooleanField(default=True)

	class Meta:
		ordering = ['dataType', '-createdAt']
		unique_together = (
            ('userInfo', 'dataType', 'dataName'),    # 联合唯一
        )
