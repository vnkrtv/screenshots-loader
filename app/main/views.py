from django.contrib.auth import logout, login
from django.contrib.auth.models import User
from django.http import HttpResponse, HttpRequest
from django.shortcuts import render, redirect
from django.urls import reverse
from urllib3.exceptions import DecodeError

from . import utils
from .decorators import unauthenticated_user, allowed_users
from .models import Profile


def login_page(request: HttpRequest) -> HttpResponse:
    """Authorize user and redirect him to available_tests page"""
    logout(request)
    try:
        username, group = utils.get_auth_data(request)
    except DecodeError:
        return HttpResponse("JWT decode error: chet polomalos'")

    group2id = {
        'admin': 1,
        'teacher': 1,
        'student': 2
    }

    try:
        user = User.objects.get(username=username)
    except User.DoesNotExist:
        if group in ['student', 'teacher']:
            user = User(username=username, password='')
        elif group in ['admin']:
            user = User.objects.create_superuser(username=username, email='', password='')
        else:
            return HttpResponse('Incorrect group.')
        user.save()
        user.groups.add(group2id[group])
        utils.create_profile(request, user)

    id2group = {
        1: 'lecturer',
        2: 'student'
    }
    if not user.groups.filter(name=id2group[group2id[group]]):
        if group2id[group] != 1:
            return HttpResponse("User with username '%s' already exist." % user.username)
        else:
            if user.groups.filter(name='student'):
                user.groups.remove(2)
            user.groups.add(group2id[group])

    login(request, user)
    return redirect(reverse('main:index'))


@unauthenticated_user
def index(request: HttpRequest) -> HttpResponse:
    context = {
        'title': 'Screenshots loader'
    }
    return render(request, 'main/index.html', context)
