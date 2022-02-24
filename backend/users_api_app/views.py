from rest_framework.views import APIView
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from .serializers import UserProfileSerializer
from .models import UserProfile
from .usercontroller import UserController

class UserApiView(APIView):
    """
        handler el endpoint api/users/subordinates/<int:pk>/
        responde con el usuario <int:pk> y sus subordinados
    """
    serializer_class = UserProfileSerializer

    def get(self, request, pk=None):
        
        user = UserProfile.objects.filter(id = pk).first()
        user_controller = UserController()
        user_controller.get_worker(pk)
        user_serialized = self.serializer_class(user)
        return Response(user_serialized.data)


class UserApiViewSet(viewsets.ModelViewSet):
    """
        Controlador api de usuarios, forma rapida para gestionar usuarios
    """
    serializer_class = UserProfileSerializer
    queryset = UserProfileSerializer.Meta.model.objects.filter(is_active = True)