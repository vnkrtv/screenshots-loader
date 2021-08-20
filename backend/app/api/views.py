from rest_framework import status
from rest_framework.generics import get_object_or_404
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import Profile, Subject, Lesson, Screenshot
from .permissions import EditingForLecturerOnly
from .serializers import ProfileSerializer, SubjectSerializer, LessonSerializer, ScreenshotSerializer


class UserAPI(APIView):
    authentication_classes = []
    permission_classes = [IsAuthenticated, EditingForLecturerOnly]

    def get(self, request):
        users = Profile.objects.all()

        group = request.query_params.get('group', None)
        if group:
            users = users.filter(user__groups__name=group)

        serializer = ProfileSerializer(users, many=True)
        return Response({
            'users': serializer.data
        }, status.HTTP_200_OK)


class SubjectAPI(APIView):
    authentication_classes = []
    permission_classes = [IsAuthenticated, EditingForLecturerOnly]

    def get(self, _):
        serializer = SubjectSerializer(Subject.objects.all(), many=True)
        return Response({
            'subjects': serializer.data
        }, status.HTTP_200_OK)

    def post(self, request):
        serializer = SubjectSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            new_subject = serializer.save()
        return Response({
            'success': "Предмет '%s' успешно добавлен." % new_subject.name
        }, status.HTTP_201_CREATED)

    def put(self, request, subject_id):
        updated_subject = get_object_or_404(Subject.objects.all(), pk=subject_id)
        serializer = SubjectSerializer(instance=updated_subject, data=request.data, partial=True)
        if serializer.is_valid(raise_exception=True):
            updated_subject = serializer.save()
        return Response({
            'success': "Предмет '%s' был успешно отредактирован." % updated_subject.name
        }, status.HTTP_200_OK)

    def delete(self, _, subject_id):
        subject = get_object_or_404(Subject.objects.all(), pk=subject_id)
        message = "Учебный предмет '%s', а также все учебные предметы, " \
                  "относящиеся к нему, были успешно удалены." % subject.name
        subject.delete()
        return Response({
            'success': message
        }, status.HTTP_200_OK)


class ScreenshotAPI(APIView):
    authentication_classes = []
    permission_classes = [IsAuthenticated, EditingForLecturerOnly]

    def get(self, _):
        serializer = ScreenshotSerializer(Screenshot.objects.all(), many=True)
        return Response({
            'screenshots': serializer.data
        }, status.HTTP_200_OK)

    def post(self, request):
        serializer = ScreenshotSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            new_screenshot = serializer.save()
        return Response({
            'success': "Скриншот '%s' успешно добавлен." % new_screenshot.name
        }, status.HTTP_201_CREATED)

    def put(self, request, screenshot_id):
        updated_screenshot = get_object_or_404(Screenshot.objects.all(), pk=screenshot_id)
        serializer = ScreenshotSerializer(instance=updated_screenshot, data=request.data, partial=True)
        if serializer.is_valid(raise_exception=True):
            updated_screenshot = serializer.save()
        return Response({
            'success': "Скриншот '%s' был успешно отредактирован." % updated_screenshot.name
        }, status.HTTP_200_OK)

    def delete(self, _, screenshot_id):
        screenshot = get_object_or_404(Screenshot.objects.all(), pk=screenshot_id)
        message = "Скриншот '%s' был успешно удален." % screenshot.name
        screenshot.delete()
        return Response({
            'success': message
        }, status.HTTP_200_OK)


class LessonAPI(APIView):
    authentication_classes = []
    permission_classes = [IsAuthenticated, EditingForLecturerOnly]

    def get(self, _):
        serializer = LessonSerializer(Lesson.objects.all(), many=True)
        return Response({
            'lessons': serializer.data
        }, status.HTTP_200_OK)

    def post(self, request):
        serializer = LessonSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            new_lesson = serializer.save()
        return Response({
            'success': "Учебное занятие '%s' успешно добавлен." % new_lesson.name
        }, status.HTTP_201_CREATED)

    def put(self, request, lesson_id):
        updated_lesson = get_object_or_404(Lesson.objects.all(), pk=lesson_id)
        serializer = LessonSerializer(instance=updated_lesson, data=request.data, partial=True)
        if serializer.is_valid(raise_exception=True):
            updated_lesson = serializer.save()
        return Response({
            'success': "Учебное занятие '%s' было успешно отредактировано." % updated_lesson.name
        }, status.HTTP_200_OK)

    def delete(self, _, lesson_id):
        lesson = get_object_or_404(Lesson.objects.all(), pk=lesson_id)
        message = "Учебное занятие '%s' успешно удалено." % lesson.name
        lesson.delete()
        return Response({
            'success': message
        }, status.HTTP_200_OK)
