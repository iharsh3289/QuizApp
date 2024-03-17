# middleware.py
from django.utils.functional import SimpleLazyObject
from django.contrib.auth.middleware import get_user
from django.conf import settings

class AuthTokenMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # Add auth token to request headers if user is authenticated
        if request.user.is_authenticated:
            request.META['HTTP_AUTHORIZATION'] = f'Token {request.user.auth_token.key}'

        response = self.get_response(request)
        return response
