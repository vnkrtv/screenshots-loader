from django.contrib.auth import logout, login
from django.contrib.auth.models import User
from django.http import HttpResponse, HttpRequest, JsonResponse
from django.urls import reverse
from django.views import View
from django.template.context_processors import csrf
from rest_framework.generics import get_object_or_404

from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from . import utils
from .decorators import unauthenticated_user, allowed_users
from .models import Profile, Subject, Lesson
from .permissions import EditingForLecturerOnly
from .serializers import ProfileSerializer, SubjectSerializer, LessonSerializer


@unauthenticated_user
def index(request: HttpRequest) -> HttpResponse:
    """Home page"""
    context = {
        'title': 'Screenshots loader'
    }
    return JsonResponse({
        'csrftoken': str(csrf(request)['csrf_token'])
    })


class LoginView(View):

    # def get(self, request: HttpRequest) -> HttpResponse:
    #     """Authorize user and redirect him to available_tests page"""
    #     # logout(request)
    #
    #     # login(request, user)
    #     # return redirect(reverse('main:index'))
    #     return JsonResponse({
    #         'csrftoken': str(csrf(request)['csrf_token'])
    #     })

    def post(self, request: HttpRequest) -> HttpResponse:
        return JsonResponse({
            'user': 'user'
        })


class UserAPI(APIView):
    authentication_classes = []
    permission_classes = []
    # permission_classes = [IsAuthenticated, EditingForLecturerOnly]

    def get(self, request):
        users = Profile.objects.all()

        group = request.query_params.get('group', None)
        if group:
            users = users.filter(user__groups__name=group)

        serializer = ProfileSerializer(users, many=True)
        return Response({
            'users': serializer.data
        })


class SubjectAPI(APIView):
    authentication_classes = []
    permission_classes = []
    # permission_classes = [IsAuthenticated, EditingForLecturerOnly]

    def get(self, _):
        serializer = SubjectSerializer(Subject.objects.all(), many=True)
        return Response({
            'subjects': serializer.data
        })

    def post(self, request):
        serializer = SubjectSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            new_subject = serializer.save()
        return Response({
            'success': "Предмет '%s' успешно добавлен." % new_subject.name
        })

    def put(self, request, subject_id):
        updated_subject = get_object_or_404(Subject.objects.all(), pk=subject_id)
        serializer = SubjectSerializer(instance=updated_subject, data=request.data, partial=True)
        if serializer.is_valid(raise_exception=True):
            updated_subject = serializer.save()
        return Response({
            'success': "Предмет '%s' был успешно отредактирован." % updated_subject.name
        })

    def delete(self, _, subject_id):
        subject = get_object_or_404(Subject.objects.all(), pk=subject_id)
        message = "Учебный предмет '%s', а также все учебные предметы, " \
                  "относящиеся к нему, были успешно удалены." % subject.name
        subject.delete()
        return Response({
            'success': message
        })

class LessonAPI(APIView):
    authentication_classes = []
    permission_classes = []
    # permission_classes = [IsAuthenticated, EditingForLecturerOnly]

    def get(self, _):
        serializer = LessonSerializer(Lesson.objects.all(), many=True)
        return Response({
            'lessons': serializer.data
        })

    def post(self, request):
        serializer = LessonSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            new_lesson = serializer.save()
        return Response({
            'success': "Учебное занятие '%s' успешно добавлен." % new_lesson.name
        })

    def put(self, request, lesson_id):
        updated_lesson = get_object_or_404(Lesson.objects.all(), pk=lesson_id)
        serializer = LessonSerializer(instance=updated_lesson, data=request.data, partial=True)
        if serializer.is_valid(raise_exception=True):
            updated_lesson = serializer.save()
        return Response({
            'success': "Учебное занятие '%s' было успешно отредактировано." % updated_lesson.name
        })

    def delete(self, _, lesson_id):
        lesson = get_object_or_404(Lesson.objects.all(), pk=lesson_id)
        message = "Учебное занятие '%s' успешно удалено." % lesson.name
        lesson.delete()
        return Response({
            'success': message
        })

