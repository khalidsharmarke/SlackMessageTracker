from django.http import JsonResponse
from django.views import View
import json

from api.views.ErrorHandler import ErrorHandler
from django.db.utils import IntegrityError


class BaseHandler(View, ErrorHandler):
    http_method_names = ['post', 'patch']

    @staticmethod
    def add_item(item_definition, item_params):
        return item_definition.objects.get_or_create(**item_params)

    @staticmethod
    def edit_item(item_id, item_definition, item_params):
        item = item_definition.objects.get(item_id)
        item.update(**item_params)
        return item

    # @staticmethod
    # def check_request_data(requested_item, item_keys, existing_item=False):
    #     if existing_item:
    #         for key, value in requested_item.items():
    #             if key not in item_keys:
    #                 super().incorrect_keys_error()
    #             if type(value) is not str:
    #                 super().incorrect_values_error()
    #     if not existing_item:
    #         if set(requested_item.keys()) != set(item_keys):
    #             super().incorrect_keys_error()
    #         for key, value in requested_item.items():
    #             if key != 'deleted':
    #                 if type(value) is not str:
    #                     super().incorrect_values_error()
    #             else:
    #                 if type(value) is not bool:
    #                     super().incorrect_values_error()

    def post_method(self, request, item_name, item_definition):
        item_name_as_plural = item_name + 's'
        try:
            # parse out body
            request_body = json.loads(request.body)
            # check if passed a list of items
            if item_name_as_plural in request_body \
                    and \
                    isinstance(request_body[item_name_as_plural], list) \
                    and \
                    request_body[item_name_as_plural]:
                item_list = request_body[item_name_as_plural]
                list_of_unhandled_items = []
                # attempt to add each item
                for item in item_list:
                    attempted_addition = self.add_item(item_definition, item)
                    # track unadded items to return to requester
                    if attempted_addition[1] is False:
                        list_of_unhandled_items.append(item)
                # send requester back list of unadded items
                if not list_of_unhandled_items:
                    response = JsonResponse({item_name_as_plural: 'items added'})
                if list_of_unhandled_items:
                    response = JsonResponse({
                        'status': 'some users were not added',
                        item_name_as_plural: list_of_unhandled_items
                    })
            else:
                super().incorrect_keys_error()
        except json.decoder.JSONDecodeError:
            response = JsonResponse({item_name_as_plural: 'no valid body in the request'})
            response.status_code = 400
        except (TypeError, ValueError) as e:
            response = JsonResponse({item_name_as_plural: str(e)})
            response.status_code = 400
        except IntegrityError as e:
            response = JsonResponse({item_name_as_plural: str(e)})
            response.status_code = 400
        return response

    def patch_method(self, request, item_id, item_name, item_definition):
        try:
            if not item_id:
                super().missing_id_error()
            request_body = json.loads(request.body)
            if not item_name in request_body:
                super().incorrect_keys_error()
            item = self.edit_item(item_id, item_definition, request_body)
            response = JsonResponse({
                'status': 'item updated',
                item_name: item
            })
        except json.decoder.JSONDecodeError:
            response = JsonResponse({'status': 'no valid body in the request'})
            response.status_code = 400
        except (ValueError, ReferenceError) as e:
            response = JsonResponse({'status': str(e)})
            response.status_code = 400
        return response
