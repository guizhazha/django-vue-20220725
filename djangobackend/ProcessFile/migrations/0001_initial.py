# Generated by Django 4.1.2 on 2022-10-30 00:18

import ProcessFile.models
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('systemData', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='ProcessFile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('fileType', models.CharField(max_length=500)),
                ('createdAt', models.CharField(max_length=500)),
                ('processId', models.CharField(max_length=500)),
                ('fileName', models.CharField(max_length=500)),
                ('file', models.FileField(upload_to=ProcessFile.models.ProcessFilePath)),
                ('userInfo', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='systemData.userinfo', to_field='card')),
            ],
            options={
                'ordering': ['fileType', '-createdAt'],
                'unique_together': {('userInfo', 'fileType', 'fileName')},
            },
        ),
    ]
