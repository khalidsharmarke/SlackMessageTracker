from api.views.BaseView import BaseHandler
from api.models import User


class UserHandler(BaseHandler):
    def post(self, request):
        return self.post_method(request, 'user', User)

    def patch(self, request, user_id):
        return self.patch_method(request, user_id, 'user', User)
