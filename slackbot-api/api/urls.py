from django.urls import path
from api.views import *


urlpatterns = [
    path('', Index),
    path('user', UserHandler.as_view()),
    path('user/<user_id>', UserHandler.as_view()),
    path('message', MessageHandler.as_view()),
    path('message/<message_id>', MessageHandler.as_view()),
    path('channel', ChannelHandler.as_view()),
    path('channel/<channel_id>', ChannelHandler.as_view()),
]