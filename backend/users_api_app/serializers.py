from rest_framework import serializers
from .models import UserProfile

class UserProfileSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = UserProfile
        fields = '__all__'

class UserTokenSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = (
            'id',
            'name', 
            'lastname', 
            'email', 
            'employee_id',
            'national_id',
            'birthday',
            'gender',
            'start_date',
            'position',
            'boss',
            'zone',
            'city',
            'department',
            'sales',
            'picture',
            'phone',
        )