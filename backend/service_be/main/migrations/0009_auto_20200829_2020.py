# Generated by Django 3.1 on 2020-08-29 20:20

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0008_auto_20200829_2015'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='id',
            field=models.CharField(default=uuid.uuid4, max_length=256, primary_key=True, serialize=False),
        ),
    ]