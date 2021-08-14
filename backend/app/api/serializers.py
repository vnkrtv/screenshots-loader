import json
import pathlib
from typing import List, Dict, Any

from django.core.files.base import ContentFile
from django.core.files.storage import default_storage
from django.contrib.auth.models import User

from rest_framework import serializers

from .models import Profile, Subject


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username')


class ProfileSerializer(serializers.ModelSerializer):
    username = serializers.SerializerMethodField()

    def get_username(self, profile):
        return profile.user.username

    class Meta:
        model = Profile
        fields = ('id', 'username', 'course', 'created_at', 'name', 'web_url', 'group', 'admission_year', 'number')


class SubjectSerializer(serializers.ModelSerializer):

    def create(self, validated_data):
        return Subject.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.description = validated_data.get('description', instance.description)
        instance.save()
        return instance

    class Meta:
        model = Subject
        fields = ('id', 'name', 'description')
