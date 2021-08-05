from api.views.BaseView import BaseHandler
from api.models import Message


class MessageHandler(BaseHandler):
    def post(self, request):
        return self.post_method(request, 'message', Message)

    def patch(self, request, message_id):
        return self.patch_method(request, message_id, 'message', Message)
