import uuid

from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.postgres.fields import ArrayField
from django.utils.timezone import now

# PAY_CHOICES = (('fix', 'fix'), ('hourly', 'hourly'))


class User(AbstractUser):
    id = models.CharField(default=uuid.uuid4, max_length=256, primary_key=True)
    is_email_verified = models.BooleanField(default=True)
    eth_address = models.CharField(max_length=45)
    about = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.email


class Job(models.Model):
    id = models.CharField(default=uuid.uuid4, max_length=256, primary_key=True)
    title = models.CharField(max_length=256, null=False, blank=False)
    description = models.TextField(null=False, blank=True)
    # pay_type = models.CharField(choices=PAY_CHOICES, blank=False, null=False, max_length=128)
    budget = models.IntegerField()
    # max_pay_budget = models.IntegerField()
    skills_required = ArrayField(models.CharField(blank=False, max_length=64))
    employer = models.ForeignKey(User, on_delete=models.CASCADE, related_name='employer')

    approved = models.BooleanField(default=False)
    awarded_to = models.ForeignKey('main.Proposal', on_delete=models.CASCADE, related_name='awarded_to_proposal', null=True, blank=True)
    submitted_on = models.DateTimeField(default=now, blank=True)

        payout_released = models.BooleanField(default=False)
    job_disputed = models.BooleanField(default=False)

    def __str__(self):
        return '{} {} {}'.format(self.id, self.title, self.employer.email)


class Proposal(models.Model):
    id = models.CharField(primary_key=True, default=uuid.uuid4, max_length=256)
    title = models.CharField(max_length=256, null=False, blank=False)
    description = models.TextField(null=False, blank=True)
    proposer = models.ForeignKey(User, on_delete=models.CASCADE)
    proposal_job = models.ForeignKey(Job, on_delete=models.CASCADE)
    submitted_on = models.DateTimeField(default=now, blank=True)

    def __str__(self):
        return '{} {}'.format(self.id, self.title)