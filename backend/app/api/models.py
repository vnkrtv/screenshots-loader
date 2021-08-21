from django.contrib.auth.models import User
from django.conf import settings
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils import timezone


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(default=timezone.now)
    name = models.CharField(max_length=30, default='')
    web_url = models.URLField(default='')
    group = models.IntegerField(default=0)
    admission_year = models.IntegerField(default=0)
    number = models.IntegerField(default=0)

    @property
    def course(self) -> int:
        now = timezone.now()
        course = now.year - self.admission_year
        if now.month >= 9:
            course += 1
        if course > 2000:
            course = 0
        return course
#
#
# @receiver(post_save, sender=User)
# def create_user_profile(sender, instance, created, **kwargs):
#     if created:
#         Profile.objects.create(id=instance.id, user=instance)
#
#
# @receiver(post_save, sender=User)
# def save_user_profile(sender, instance, **kwargs):
#     try:
#         instance.profile.save()
#     except User.profile.RelatedObjectDoesNotExist:
#         Profile.objects.create(id=instance.id, user=instance)


class Subject(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(
        verbose_name='Название дисциплины',
        max_length=50)
    description = models.TextField(
        verbose_name='Описание дисциплины',
        default="")

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Дисциплина'
        verbose_name_plural = 'Дисциплины'


class Lesson(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(
        verbose_name='Название занятия',
        max_length=50,
        default='')
    subject = models.ForeignKey(
        Subject,
        verbose_name='Предмет',
        related_name='tests',
        on_delete=models.CASCADE)
    description = models.TextField(
        verbose_name='Описание занятия',
        default="")

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Практическое занатие'
        verbose_name_plural = 'Практические занятия'


class Screenshot(models.Model):
    id = models.IntegerField(primary_key=True)
    lesson = models.ForeignKey(
        Lesson,
        verbose_name='Практическое занятие',
        related_name='screenshots',
        on_delete=models.CASCADE)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        verbose_name='Составитель',
        related_name='screenshots',
        on_delete=models.CASCADE)
    image = models.ImageField(
        verbose_name='Скриншот',
        upload_to='screenshots')
    description = models.TextField(
        verbose_name='Описание',
        default="")

    class Meta:
        verbose_name = 'Скриншот'
        verbose_name_plural = 'Скриншоты'
