from django.db import models
from rest_framework import serializers
from .models import Room
from django.contrib.auth.models import User
#from ../spotify/models import ErgebnisTracks10 """

class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ('id', 'code', 'host', 'created_at')

class CreateRoomSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Room
        fields = '__all__'
        read_only_fields = ['host']


class CreateSettingsUserSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = User
        fields = ('username', 'first_name', 'last_name', 'email', 'password')


class LoginSettingsUserSerializerEins(serializers.ModelSerializer):
    
    class Meta:
        model = User
        fields = ('username', 'password')

    
class LoginSettingsUserSerializerZwei(serializers.ModelSerializer):
    
    class Meta:
        model = User
        fields = ('email', 'password')


class UpdateRoomSerializer(serializers.ModelSerializer):
    code = serializers.CharField(validators=[])

    class Meta:
        model = Room
        fields = ('code')