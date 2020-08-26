# Generated by Django 3.1 on 2020-08-26 19:54

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0004_auto_20200826_1954'),
    ]

    operations = [
        migrations.AlterField(
            model_name='job',
            name='id',
            field=models.CharField(default=uuid.UUID('42797306-0eff-48b3-ad8e-308b89184e54'), max_length=256, primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='user',
            name='id',
            field=models.CharField(default=uuid.UUID('b24f94d6-b53d-48ff-b078-88f66cf38b11'), max_length=256, primary_key=True, serialize=False),
        ),
    ]
