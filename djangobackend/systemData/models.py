from django.db import models

# Create your models here.
class UserInfo(models.Model):
	name = models.CharField(max_length=500)
	card = models.CharField(max_length=200, unique=True)
	school = models.CharField(max_length=500)
	password = models.CharField(max_length=500)
	email = models.EmailField()
	phone = models.CharField(max_length=500)
	role = models.CharField(max_length=500)
	createdAt = models.CharField(max_length=500)
	isManager = models.BooleanField(default=False)

	class Meta:
		ordering = ['card']

class RelaNumber(models.Model):
	userInfo = models.ForeignKey(UserInfo, to_field="card", on_delete=models.CASCADE)
	number = models.CharField(max_length=500)

	class Meta:
		unique_together = (
            ('userInfo', 'number'),    # 联合唯一
        )