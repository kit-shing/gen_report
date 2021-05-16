from rest_framework import serializers
from .models import Report
from django.core.files import File
from django.conf import settings


class GenerateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Report
        fields = (
            "count",
            "total_alphabetical",
            "total_real_number",
            "total_integer",
            "total_alphanumeric",
            "file"
        )
        extra_kwargs = {
            'count': {'validators': []},
        }
