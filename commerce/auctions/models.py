from turtle import update
from unicodedata import decimal
from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    pass

class Bid(models.Model):
    value = models.DecimalField(max_digits=9, decimal_places=2)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user_bids")

class Comment(models.Model):
    content = models.CharField(max_length=2048)
    created_at = models.DateTimeField(auto_now_add=True)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user_comments")

class Listing(models.Model):
    title = models.CharField(max_length=64)
    description = models.CharField(max_length=256)
    image_url = models.URLField(max_length = 256, blank=True)
    category = models.CharField(max_length=64, blank=True)
    bids = models.ManyToManyField(Bid, related_name="listing_bids")
    comments = models.ManyToManyField(Comment, related_name="listing_comments")
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user_listings")
    winner = models.ForeignKey(User, null=True, on_delete=models.CASCADE, related_name="user_winning_listings")
    active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    def __str__(self):
        return f"{self.title}"



