from django.contrib.auth.models import User
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils import timezone


class Profile(models.Model):
    id = models.IntegerField(primary_key=True)
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


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(id=instance.id, user=instance)


@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    try:
        instance.profile.save()
    except User.profile.RelatedObjectDoesNotExist:
        Profile.objects.create(id=instance.id, user=instance)
