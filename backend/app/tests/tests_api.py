# pylint: disable=import-error, invalid-name, too-few-public-methods, relative-beyond-top-level
"""
Main app tests, covered views.py, models.py and mongo.py
"""
import json
from unittest import mock, skip

from django.test import TestCase, Client
from django.urls import reverse
from django.contrib.auth.models import User, Group

from rest_framework.test import APIRequestFactory, APIClient, force_authenticate

from api.models import Subject, Lesson


class MainTest(TestCase):
    """
    Base class for all tests
    """

    def setUp(self) -> None:
        """
        Add objects to temporary test database:
        - groups 'lecturer' and 'student'
        - 'lecturer' user and 'student' user
        - study subject 'Subject'
        - Lesson 'PZ1'
        """
        self.lecturer = User.objects.create_user(
            username='lecturer',
            password='')
        Group.objects.create(
            id=1,
            name="lecturer")
        self.lecturer.groups.add(1)

        self.student = User.objects.create_user(
            username='user',
            password='')
        Group.objects.create(
            id=2,
            name="student")
        self.student.groups.add(2)

        self.subject = Subject.objects.create(
            name='Subject',
            description='Description of subject')

        self.lesson = Lesson.objects.create(
            subject=self.subject,
            description='Description of hard test for Subject')


class SubjectAPITest(MainTest):
    """
    Tests for SubjectAPI
    """

    def test_get_for_unauthenticated_user(self):
        """
        Test response code for unauthenticated user
        """
        client = APIClient()
        client.logout()
        response = client.get(reverse('api:subjects_api'))

        self.assertEqual(response.status_code, 401)
