from django.db import models
from api.models import User, Channel


class Message(models.Model):
    user = models.ForeignKey(User, to_field='user_id', on_delete=models.PROTECT)
    channel = models.ForeignKey(Channel, to_field='channel_id', on_delete=models.PROTECT)
    body = models.TextField()
    message_id = models.TextField()
    ts = models.TextField()
