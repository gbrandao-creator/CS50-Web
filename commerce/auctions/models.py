from unicodedata import decimal
from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    pass

class Listing(models.Model):
    #id = models.BigAutoField(primary_key=True)
    title = models.CharField(max_length=64)
    description = models.CharField(max_length=256)
    starting_bid = models.DecimalField(max_digits=9, decimal_places=2)
    url = models.URLField(max_length = 256, blank=True)

    def __str__(self):
        return f"{self.title}"