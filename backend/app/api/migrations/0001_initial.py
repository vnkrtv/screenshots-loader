# Generated by Django 3.2.5 on 2021-08-20 19:27

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Lesson',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('description', models.TextField(default='', verbose_name='Описание занятия')),
            ],
            options={
                'verbose_name': 'Практическое занатие',
                'verbose_name_plural': 'Практические занятия',
            },
        ),
        migrations.CreateModel(
            name='Subject',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=50, verbose_name='Название дисциплины')),
                ('description', models.TextField(default='', verbose_name='Описание дисциплины')),
            ],
            options={
                'verbose_name': 'Дисциплина',
                'verbose_name_plural': 'Дисциплины',
            },
        ),
        migrations.CreateModel(
            name='Screenshot',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('image', models.ImageField(upload_to='screenshots', verbose_name='Скриншот')),
                ('description', models.TextField(default='', verbose_name='Описание')),
                ('lesson', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='screenshots', to='api.lesson', verbose_name='Практическое занятие')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='screenshots', to=settings.AUTH_USER_MODEL, verbose_name='Составитель')),
            ],
            options={
                'verbose_name': 'Скриншот',
                'verbose_name_plural': 'Скриншоты',
            },
        ),
        migrations.CreateModel(
            name='Profile',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('name', models.CharField(default='', max_length=30)),
                ('web_url', models.URLField(default='')),
                ('group', models.IntegerField(default=0)),
                ('admission_year', models.IntegerField(default=0)),
                ('number', models.IntegerField(default=0)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AddField(
            model_name='lesson',
            name='subject',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='tests', to='api.subject', verbose_name='Предмет'),
        ),
    ]
