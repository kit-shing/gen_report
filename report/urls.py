from rest_framework import routers
from django.urls import path
from django.conf.urls import url, include, re_path
from . import views
from .api import (
    GenerateReportViewSet,
)

router = routers.DefaultRouter()
router.register("api/generate", GenerateReportViewSet, "reports")

urlpatterns = [
    url("", include(router.urls)),
    #url(r"^api/generate", GenerateReportAPI.as_view()),
]
