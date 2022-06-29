from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    pass

class Post():
    content = models.CharField(max_length=240)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user_posts")
    creation_date = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)