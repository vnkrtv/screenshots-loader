from django.contrib.auth.models import User

from rest_framework import serializers

from .utils import create_profile


class UserCreateSerializer(serializers.ModelSerializer):
    fullname = serializers.CharField()
    password = serializers.CharField(
        write_only=True,
        required=True,
        style={'input_type': 'password'})
    password2 = serializers.CharField(
        write_only=True,
        required=True,
        style={'input_type': 'password'},
        label='Подтвердите пароль')

    class Meta:
        model = User
        fields = ('fullname', 'username', 'password', 'password2')

    def create(self, validated_data):
        username = validated_data['username']
        fullname = validated_data['fullname']
        password = validated_data['password']
        password2 = validated_data['password2']
        if password != password2:
            raise serializers.ValidationError('пароли различаются')
        if User.objects.filter(username=username):
            raise serializers.ValidationError(f'пользователь {username} уже существует')
        user = User(username=username)
        user.set_password(password)
        user.save()
        create_profile(user, fullname)
        return user
