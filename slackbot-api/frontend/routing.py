from django.urls import path
from frontend.consumers import FrontEndConsumer

websocket_urlpatterns = [
    path('ws/', FrontEndConsumer.as_asgi())
]
