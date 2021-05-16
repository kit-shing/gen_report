from django.urls import path
from django.conf.urls import url, include, re_path
from . import views

urlpatterns = [url(r"^", views.index),
               url(r"^report/", views.index), ]
