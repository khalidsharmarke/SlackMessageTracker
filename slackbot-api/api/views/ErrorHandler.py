from django.http import JsonResponse


class ErrorHandler():
    def missing_id_error(self):
        raise ReferenceError('No user in request path')

    def preexisting_entry_error(self):
        raise ValueError('user already exists')

    def incorrect_keys_error(self):
        raise ValueError('invalid keys in request')

    def incorrect_values_error(self):
        raise TypeError('invalid values for keys in request')

    def entry_does_not_exist(self):
        return 'entry does not exist'

    def response_on_error(self, error):
        return JsonResponse()