# Generated by Django 3.1 on 2020-09-01 22:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0010_auto_20200901_1704'),
    ]

    operations = [
        migrations.AddField(
            model_name='job',
            name='job_disputed',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='job',
            name='payout_released',
            field=models.BooleanField(default=False),
        ),
    ]