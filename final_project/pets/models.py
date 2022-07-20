from django.contrib.auth.models import AbstractUser
from django.db import models

# Create your models here.
class User(AbstractUser):
    photo_url = models.URLField(max_length=250, null=True, blank=True)
    bio = models.CharField(max_length=1000, null=True, blank=True)
    is_pet_sitter = models.BooleanField(null=True, blank=True)
    hour_rate = models.FloatField(null=True, blank=True)
    confirmed = models.BooleanField(default=False)

