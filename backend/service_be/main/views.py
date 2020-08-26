import json

from django.shortcuts import render

from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from rest_framework.generics import GenericAPIView
from rest_framework.mixins import CreateModelMixin, UpdateModelMixin, DestroyModelMixin, ListModelMixin, RetrieveModelMixin

from .models import User, Proposal, Job
from .serializers import JobSerializer, UserSerializer, ProposalSerializer

class RootView(APIView):

    def get(self, request):
        resp = {
            'status': 'True'
        }
        return Response(json.dumps(resp), status=status.HTTP_200_OK)

    def post(self, request):
        data = request.data
        resp = {
            'status': data
        }

        return Response(json.dumps(resp), status=status.HTTP_201_CREATED)


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


class ProposalsList(CreateModelMixin,
                    GenericAPIView):
    serializer_class = ProposalSerializer

    def get(self, request, *args, **kwargs):
        data = request.data
        job = Job.object.get(pk=data.get('job_id'))
        job_proposals = Proposal.objects.filter(proposal_job=job)
        job_serializer = ProposalSerializer(job_proposals, many=True)
        return Response(job_serializer.data, status=status.HTTP_201_CREATED)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)


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