from rest_framework import serializers
from .models import UserProfile

class UserProfileSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = UserProfile
        fields = '__all__'

class UserTokenSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ('name', 'lastname', 'email')