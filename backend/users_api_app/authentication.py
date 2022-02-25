from rest_framework.authentication import get_authorization_header, TokenAuthentication
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
from rest_framework import status 

class TokenVerification(TokenAuthentication):
    """
        Validar el token que viene en las peticiones a la api
    """
    def validate_token(self, key):
        msg = 'token validated'
        
        try:
            token = self.get_model().objects.select_related('user').get(key = key)
            user = token.user

            if not user.is_active:
                msg = 'Usuario no existe'
                
        except self.get_model().DoesNotExist:
           msg = 'token invalido'
           user = None
           token = None
        

        return(user, token, msg)


class Authentication(object):

    def get_user(self, request):
        token = get_authorization_header(request).split()
        if token:
            try:
                token = token[1].decode()
            except:
                return {'user':None, 'msg':'No token'}

            # token exist
            validate_token = TokenVerification()
            user, token, msg = validate_token.validate_token(token)
            
            if msg == 'token validated':
                return {'user':user, 'msg':'valid token'}
            #token invalid
            return {'user':None, 'msg':msg}
        # no token
        return {'user':None, 'msg':'no token in request'}


    def dispatch(self, request, *args, **kwargs):
        validated_user = self.get_user(request)

        #invalid token
        if validated_user['user'] is None:
            res = Response({'msg':validated_user['msg']}, status=status.HTTP_401_UNAUTHORIZED)
            res.accepted_renderer = JSONRenderer()
            res.accepted_media_type = 'application/json'
            res.renderer_context = {}
            return res
        
        return super().dispatch(request, *args, **kwargs)      