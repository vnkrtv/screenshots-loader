from datetime import datetime
from typing import Tuple

import jwt
import requests

from django.conf import settings
from django.http import HttpRequest

from app.main.models import Profile


def get_auth_data(request: HttpRequest) -> Tuple[str, str]:
    """
    Get user's username and group using 'user_jqt' cookies
    :param request: <HttpRequest>
    :return: tuple(username: str, group: str)
    """
    user_jwt = request.COOKIES.get('user_jwt', '')
    key_id = jwt.get_unverified_header(user_jwt).get('kid')
    public_key = requests.get(settings.AUTH_URL + key_id).text
    decoded_jwt = jwt.decode(user_jwt, public_key, algorithms='RS256')
    username = decoded_jwt.get('username', '')
    group = decoded_jwt.get('group', '')
    return username, group


def create_profile(request: HttpRequest, user: User) -> Profile:
    """
    Get user's profile info using 'user_jqt' cookies
    :param user: user which profile will be created
    :param request: <HttpRequest>
    :return: created profile
    """
    profile = requests.get(
        url=settings.PROFILE_URL,
        cookies=request.COOKIES
    ).json()
    buf = profile['name'].split('-')
    if user.groups.filter(name='lecturer'):
        admission_year, group, number = 0, 732, 0
    elif len(buf) == 4:
        admission_year, group, number, _ = buf
    else:
        admission_year, group, number = 0, 0, 0
    return Profile.objects.create(
        id=user.id,
        user=user,
        created_at=datetime.strptime(profile['created_at'], "%Y-%m-%dT%H:%M:%S.%fZ"),
        name=profile['name'],
        web_url=profile['web_url'],
        group=int(group),
        admission_year=int(admission_year),
        number=int(number))
