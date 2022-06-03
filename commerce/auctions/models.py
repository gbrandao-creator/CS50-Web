from unicodedata import decimal
from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    pass

class Bid(models.Model):
    value = models.DecimalField(max_digits=9, decimal_places=2)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user_bids")
    
class Listing(models.Model):
    title = models.CharField(max_length=64)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user_listings")
    description = models.CharField(max_length=256)
    bids = models.ManyToManyField(Bid, blank=False, related_name="listing_bids")
    image_url = models.URLField(max_length = 256, blank=True)
    category = models.CharField(max_length=64, blank=True)

    def __str__(self):
        return f"{self.title}"


