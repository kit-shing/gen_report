from django.db import models

# Create your models here.


class Report(models.Model):
    count = models.IntegerField(primary_key=True)
    total_alphabetical = models.IntegerField(null=True)
    total_real_number = models.IntegerField(null=True)
    total_integer = models.IntegerField(null=True)
    total_alphanumeric = models.IntegerField(null=True)
    file = models.TextField(blank=True, null=True)
