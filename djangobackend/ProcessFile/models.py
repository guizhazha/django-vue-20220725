from django.db import models

from systemData.models import UserInfo

# Create your models here.
def ProcessFilePath(instance, filename):
	return "{0}/{1}/{2}".format("ProcessFile", instance.userInfo.card, filename)
	
class ProcessFile(models.Model):
	userInfo = models.ForeignKey(UserInfo, to_field="card", on_delete=models.CASCADE)

	createdAt = models.CharField(max_length=500)
	processId = models.CharField(max_length=500)
	fileName = models.CharField(max_length=500)
	file = models.FileField(upload_to=ProcessFilePath)

	class Meta:
		ordering = ['-createdAt']
		unique_together = (
            ('userInfo', 'fileName'),    # 联合唯一
        )
