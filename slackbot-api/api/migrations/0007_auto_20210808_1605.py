# Generated by Django 3.2.5 on 2021-08-08 16:05

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_rename_slackuser_user'),
    ]

    operations = [
        migrations.AlterField(
            model_name='message',
            name='channel_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='api.channel', to_field='channel_id'),
        ),
        migrations.AlterField(
            model_name='message',
            name='user_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='api.user', to_field='user_id'),
        ),
        migrations.AlterField(
            model_name='user',
            name='deleted',
            field=models.BooleanField(),
        ),
        migrations.AlterField(
            model_name='user',
            name='is_bot',
            field=models.BooleanField(),
        ),
    ]