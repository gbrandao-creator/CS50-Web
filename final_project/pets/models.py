from django.contrib.auth.models import AbstractUser
from django.db import models

# Create your models here.
class User(AbstractUser):
    photo_url = models.URLField(max_length=250, blank=True)
