from django.db import models


class Channel(models.Model):
    channel_id = models.TextField(unique=True)
    name = models.TextField()
    archived = models.BooleanField(default=False)