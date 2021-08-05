from django.contrib import admin
from .models import Message, User

# Register your models here.
admin.site.register(User)
admin.site.register(Message)
