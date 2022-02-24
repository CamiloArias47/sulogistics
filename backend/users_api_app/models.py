from django.db import models
from django.contrib.auth.models import AbstractBaseUser,PermissionsMixin, BaseUserManager
from django.utils import timezone
import datetime


class UserProfileManager(BaseUserManager):
    """ Manejador perfiles de usuarios """

    def create_user(self, email, name, password=None):
        """ Crear un nuevo usuario """
        if not email:
            raise ValueError('Falta el email')
        
        email = self.normalize_email(email)
        user = self.model(email=email, name=name)

        user.set_password(password)
        user.save(using=self._db)

        return user
    
    def create_superuser(self, email, name, password):
        user = self.create_user(email, name, password)
        user.is_superuser = True
        user.is_staff = True
        user.save(using=self._db)

        return user


class UserProfile(AbstractBaseUser, PermissionsMixin):
    """ Model of users of the app (workpeople) """

    name = models.CharField(max_length=50)
    lastname = models.CharField(max_length=30)
    lastname2 = models.CharField(max_length=30)
    national_id = models.IntegerField(null=True)
    birthday = models.DateTimeField(default=datetime.date.today)
    gender = models.CharField(
        max_length=1,
        choices=[
            ('M','masculino'),
            ('F', 'femenino')
        ]
    )
    start_date = models.DateTimeField(default=datetime.date.today)
    employee_id = models.IntegerField(null=True)
    position = models.CharField(max_length=50)
    boss = models.IntegerField(null=True)
    zone = models.CharField(max_length=10)
    city = models.CharField(max_length=50)
    department = models.CharField(max_length=50)
    sales = models.IntegerField(null=True)
    email =  models.EmailField(max_length=220, unique=True)
    picture = models.CharField(max_length=200)
    phone = models.CharField(max_length=20)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserProfileManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name']

    def get_name(self):
        """ Get full name of user """
        return self.name+' '+self.lastname+' '+self.lastname2
    

    def __str__(self):
        """ Formatear respuesta de Django """
        return self.email

