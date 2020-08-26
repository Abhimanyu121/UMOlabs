from rest_framework.serializers import ModelSerializer
from rest_framework.serializers import ValidationError

from .models import User, Job, Proposal


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

    def create(self, validated_data):
        user = User.objects.create(
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', ''),
            username=validated_data.get('email', ''),
            email=validated_data.get('email', ''),
            is_email_verified=False,
            eth_address=validated_data.get('eth_address', ''),
        )
        user.set_password(validated_data.get('password', ''))
        user.save()

        return user

class JobSerializer(ModelSerializer):
    class Meta:
        model = Job
        fields ='__all__'


class ProposalSerializer(ModelSerializer):
    class Meta:
        model = Proposal
        fields = '__all__'