# Generated by Django 3.2.5 on 2021-07-12 10:33

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='SlackUser',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('user_id', models.TextField()),
                ('display_name', models.TextField()),
                ('full_name', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='Message',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('body', models.TextField()),
                ('workspace_id', models.TextField()),
                ('client_message_id', models.TextField()),
                ('ts', models.TextField()),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='api.slackuser')),
            ],
        ),
    ]
