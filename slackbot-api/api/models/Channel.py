from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver


class Channel(models.Model):
    channel_id = models.TextField(unique=True)
    name = models.TextField()
    archived = models.BooleanField(default=False)

# on db entry, alert frontend app as to the new entry
@receiver(post_save, sender=Channel)
def emit_db_channel_entry(sender, instance, **kwargs):
    layer = get_channel_layer()
    async_to_sync(layer.group_send)('live-connections', {
        'type': 'channel_added',
        'channel_name': instance.name
    })
