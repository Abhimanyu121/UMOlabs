# Generated by Django 3.1 on 2020-08-29 20:12

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0004_auto_20200829_2011'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='id',
            field=models.CharField(default=uuid.UUID('9d374258-ca4a-4a76-81cd-0849aada7bea'), max_length=256, primary_key=True, serialize=False),
        ),
    ]
