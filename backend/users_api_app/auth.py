from datetime import datetime
from django.contrib.sessions.models import Session
from urllib import request
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from .serializers import UserTokenSerializer


class Login(ObtainAuthToken):
    """
        Recibe peticiones de /login, retorna toke, usuario, correo si el login es exitoso
    """
    def post(self, requets, *args,**kwargs):
        res = Response({'msg':'login route'})
        login_serializer = self.serializer_class(data = requets.data, context={'request':request})
        print(login_serializer)
        if login_serializer.is_valid():
            user = login_serializer.validated_data['user']
            if user.is_active:
                token, created = Token.objects.get_or_create(user = user)
                user_serialized = UserTokenSerializer(user)
                if created:
                    res = Response({
                        'token' : token.key, 
                        'user' : user_serialized.data
                    }, status = status.HTTP_202_ACCEPTED)
                else:
                    token.delete()
                    token = Token.objects.create(user = user)
                    res = Response({
                        'token' : token.key, 
                        'user' : user_serialized.data
                    }, status = status.HTTP_202_ACCEPTED)
            else:
                res = Response({'msg':'Usuario no existe'}, status = status.HTTP_401_UNAUTHORIZED)
        else:
            res = Response({'msg':'Password o email incorrecto'}, status = status.HTTP_400_BAD_REQUEST)
        
        return res


class Logout(APIView):
    def get(self, request, *args,**kwargs):
        token = request.GET.get('token')
        token = Token.objects.filter(key = token).first()
        if token is not None:
            user = token.user
            sessions = Session.objects.filter(expire_date__gte = datetime.now() )
            if sessions.exists():
                for session in sessions:
                    decode_session = session.get_decoded()
                    if user.id == int( decode_session.get('_auth_user_id')):
                        session.delete()

            token.delete()
            return Response({'msg':'loged out'},status = status.HTTP_200_OK)
        else:
            return Response({'msg':'no user-token'},status = status.HTTP_400_BAD_REQUEST)

