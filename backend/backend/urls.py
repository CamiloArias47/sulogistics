from django.contrib import admin
from django.urls import path, include
from users_api_app import views, auth

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('users_api_app.urls')),
    path('api/users/subordinates/<int:pk>/', views.UserApiView.as_view()),
    path('login', auth.Login.as_view(), name = 'login'),
    path('logout', auth.Logout.as_view(), name = 'logout'),
]
