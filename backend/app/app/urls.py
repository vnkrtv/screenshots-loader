from django.conf import settings
from django.urls import path, include
from django.conf.urls.static import static
from rest_framework_swagger.views import get_swagger_view

schema_view = get_swagger_view(title='Screenshots Loader API')

urlpatterns = [
    path('api/', include('api.urls')),
    path('auth/', include('rest_framework.urls')),
    path('api/auth/', include('jwtauth.urls')),
    path('api/docs/', schema_view),


] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
