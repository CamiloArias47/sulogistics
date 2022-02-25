from rest_framework.views import APIView
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from .serializers import UserProfileSerializer
from .models import UserProfile
from .usercontroller import UserController
from .authentication import Authentication

class UserApiView(Authentication, APIView):
    """
        handler el endpoint api/users/subordinates/<int:pk>/
        responde con el usuario <int:pk>, su jefe y sus subordinados
    """
    serializer_class = UserProfileSerializer

    def get(self, request, pk=None):
        
        user = UserProfile.objects.filter(id = pk).first()
        user_controller = UserController()
        result = user_controller.get_worker(pk)
        if result is not None:
            user_serialized = self.serializer_class(user)
            res = {
                'user':user_serialized.data,
                'boss' : result['boss'],
                'subordinates': result['subordinates'],
                'subtes_tsales': result['subordinates_total_sales']
            }
            return Response(res, status=status.HTTP_200_OK)

        return Response({'msg':'No existe el usuario'}, status = status.HTTP_404_NOT_FOUND)


class UserApiViewSet(Authentication, viewsets.ModelViewSet):
    """
        Controlador api de usuarios, forma rapida para gestionar usuarios
    """
    serializer_class = UserProfileSerializer
    queryset = UserProfileSerializer.Meta.model.objects.filter(is_active = True)