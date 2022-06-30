from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    pass

class Follower(models.Model):
    user = models.ForeignKey(User, related_name="following", on_delete=models.CASCADE)
    following_user = models.ForeignKey(User, related_name="followers", on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.user.username} follows {self.following_user.username}"

class Post(models.Model):
    content = models.CharField(max_length=240)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user_posts")
    creation_date = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Posted by {self.owner} at {self.creation_date}"