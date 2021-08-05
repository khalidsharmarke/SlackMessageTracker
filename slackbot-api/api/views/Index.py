from django.http import JsonResponse


def Index(self, request):
    return JsonResponse({'test': "Hello, world. You're at the api index."})
