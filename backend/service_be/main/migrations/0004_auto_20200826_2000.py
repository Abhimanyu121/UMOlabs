# Generated by Django 3.1 on 2020-08-26 20:00

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0003_auto_20200826_2000'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='id',
            field=models.CharField(default=uuid.UUID('c52345d6-697a-42c1-98a2-84b9e33e0adb'), max_length=256, primary_key=True, serialize=False),
        ),
    ]
