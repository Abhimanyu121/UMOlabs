# Generated by Django 3.1 on 2020-08-29 20:11

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='id',
            field=models.CharField(default=uuid.UUID('5e02dcd3-38d8-4e90-a106-2014671c0ec1'), max_length=256, primary_key=True, serialize=False),
        ),
    ]