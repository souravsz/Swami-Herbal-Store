from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    phone = models.CharField(max_length=15, blank=True, null=True)
    role = models.CharField(max_length=50, default="user")
    address = models.TextField(blank=True, null=True)
