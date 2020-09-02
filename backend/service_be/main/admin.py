from django.contrib import admin
from .models import User, Job, Proposal

from django.contrib.auth.admin import UserAdmin

class UserAdminSite(admin.ModelAdmin):
    list_display = ('id','first_name', 'last_name', 'email', 'eth_address')

class JobAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'description', 'skills_required')

class ProposalAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'description')


admin.site.register(User, UserAdminSite)
admin.site.register(Job, JobAdmin)
admin.site.register(Proposal, ProposalAdmin)