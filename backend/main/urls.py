from django.contrib import admin
from django.urls import path, include
from rest_framework_mongoengine.routers import DefaultRouter
from task import views
from django.conf import settings
from django.conf.urls.static import static

router = DefaultRouter()
router.register(r"tasks", views.TaskViewSet, "task")

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include(router.urls)),
    path("", views.index),
]

urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)