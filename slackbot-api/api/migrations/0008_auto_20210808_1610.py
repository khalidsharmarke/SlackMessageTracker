# Generated by Django 3.2.5 on 2021-08-08 16:10

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0007_auto_20210808_1605'),
    ]

    operations = [
        migrations.RenameField(
            model_name='message',
            old_name='channel_id',
            new_name='channel',
        ),
        migrations.RenameField(
            model_name='message',
            old_name='user_id',
            new_name='user',
        ),
    ]
