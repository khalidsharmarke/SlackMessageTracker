from django.db import models


class User(models.Model):
    user_id = models.TextField(unique=True)
    name = models.TextField()
    display_name = models.TextField()
    full_name = models.TextField()
    deleted = models.BooleanField()
    is_bot = models.BooleanField()
