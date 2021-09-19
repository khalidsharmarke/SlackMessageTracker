from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver

from api.models import User, Channel


class Message(models.Model):
    user = models.ForeignKey(User, to_field='user_id', on_delete=models.PROTECT)
    channel = models.ForeignKey(Channel, to_field='channel_id', on_delete=models.PROTECT)
    body = models.TextField()
    message_id = models.TextField()
    ts = models.TextField()

    def populate(self):
        return {
            "user": self.user.display_name,
            "body": self.body,
            "ts": self.ts
        }

# on db entry, alert frontend app as to the new entry
@receiver(post_save, sender=Message)
def emit_db_message_entry(sender, instance, **kwargs):
    layer = get_channel_layer()
    async_to_sync(layer.group_send)('live-connections', {
        'type': 'incoming_message',
        'channel_name': instance.channel.name
    })
