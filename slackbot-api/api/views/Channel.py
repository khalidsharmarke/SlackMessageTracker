from api.views.BaseView import BaseHandler
from api.models import Channel


class ChannelHandler(BaseHandler):
    def post(self, request):
        return self.post_method(request, 'channel', Channel)

    def patch(self, request, channel_id):
        return self.patch_method(request, channel_id, 'channel', Channel)


