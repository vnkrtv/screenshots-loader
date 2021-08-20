# pylint: skip-file
from django.conf.urls import url
from django.urls import path
from django.views.decorators.csrf import csrf_exempt

from . import views

app_name = 'api'

urlpatterns = [
    path('login/', csrf_exempt(views.LoginView.as_view()), name='login_api'),
    path('users/', views.UserAPI.as_view(), name='users_api'),
    path('subjects/', views.SubjectAPI.as_view(), name='subjects_api'),
    path('subjects/<subject_id>', csrf_exempt(views.SubjectAPI.as_view()), name='edit_subjects_api'),
    path('screenshots/', views.ScreenshotAPI.as_view(), name='screenshots_api'),
    path('screenshots/<screenshot_id>', csrf_exempt(views.ScreenshotAPI.as_view()), name='edit_screenshots_api'),
    path('lessons/', views.LessonAPI.as_view(), name='lesson_api'),
    path('lessons/<lesson_id>',csrf_exempt(views.LessonAPI.as_view()), name='edit_lessons_api'),
]
