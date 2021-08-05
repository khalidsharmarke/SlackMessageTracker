from django.db import models
from api.models import User, Channel


class Message(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.PROTECT)
    channel_id = models.ForeignKey(Channel, on_delete=models.PROTECT)
    body = models.TextField()
    message_id = models.TextField()
    ts = models.TextField()
