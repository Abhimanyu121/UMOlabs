import json

from django.shortcuts import render
from django.contrib.auth import authenticate

from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from rest_framework.generics import GenericAPIView
from rest_framework.mixins import CreateModelMixin, UpdateModelMixin, DestroyModelMixin, ListModelMixin, RetrieveModelMixin
from rest_framework.exceptions import ValidationError

from .models import User, Proposal, Job
from .serializers import JobSerializer, UserSerializer, ProposalSerializer


class RootView(APIView):

    def get(self, request):
        resp = {
            'status': 'This is the API Version 1.0  '
        }
        return Response(json.dumps(resp), status=status.HTTP_200_OK)


class UserList(ListModelMixin,
               CreateModelMixin,
               GenericAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)


class UserDetail(RetrieveModelMixin,
                 UpdateModelMixin,
                 DestroyModelMixin,
                 GenericAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)


class JobsList(ListModelMixin,
               CreateModelMixin,
               GenericAPIView):
    queryset = Job.objects.all()
    serializer_class = JobSerializer

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)


class JobsDetail(RetrieveModelMixin,
                 UpdateModelMixin,
                 DestroyModelMixin,
                 GenericAPIView):
    queryset = Job.objects.all()
    serializer_class = JobSerializer

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)


class ProposalsCreate(CreateModelMixin,
                      GenericAPIView):
    serializer_class = ProposalSerializer

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)


class ProposalsList(APIView):

    def get(self, request, *args, **kwargs):
        job_id = kwargs['pk']
        job = Job.objects.get(pk=job_id)
        job_proposals = Proposal.objects.filter(proposal_job=job)
        job_serializer = ProposalSerializer(job_proposals, many=True)
        return Response(job_serializer.data, status=status.HTTP_201_CREATED)


class ProposalsDetail(RetrieveModelMixin,
                      UpdateModelMixin,
                      DestroyModelMixin,
                      GenericAPIView):

    queryset = Proposal.objects.all()
    serializer_class = ProposalSerializer

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)


class Login(APIView):

    def post(self, request):
        data = request.data

        email = data['email']
        password = data['password']

        user = authenticate(username=email, password=password)

        if not user:
            msg = 'Unable to log in with provided credentials.'
            raise ValidationError(msg, code='authorization')

        resp = {
            'status': True
        }

        return Response(json.dumps(resp), status=status.HTTP_200_OK)