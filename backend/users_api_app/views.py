from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import UserProfileSerializer
from .models import UserProfile
from .usercontroller import UserController

class UserApiView(APIView):
    """
        handler el endpoint api/users/<pk>
    """
    serializer_class = UserProfileSerializer

    def get(self, request, pk=None):
        
        user = UserProfile.objects.filter(id = pk).first()
        user_controller = UserController()
        user_controller.get_worker(pk)
        user_serialized = self.serializer_class(user)
        return Response(user_serialized.data)
    

    def post(self, request):
        """
            Crea un usuario
        """
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            name = serializer.validated_data.get('name')
            message = f'Hello {name}'
            return Response({'message': message})
        else:
            return Response(
                serializer.errors,
                status=status.HTTP_400_BAD_REQUEST
            )
