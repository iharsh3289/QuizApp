from django.urls import path,include
from . import views
from rest_framework import routers

router=routers.DefaultRouter()

urlpatterns=[
    path('register',views.register.as_view(),name='register'),
    path('login',views.login.as_view(),name='login'),
    path('logout',views.logout.as_view(),name='logout'),
    path('resetpassword',views.resetpassword.as_view(),name='resetpassword'),
    path('forgotpassword', views.forgotpassword.as_view(), name='forgotpassword'),
    path('RegisterOtpVerify', views.RegisterOtpVerify.as_view(), name='RegisterOtpVerify'),
    path('ForgotPasswordOtpVerify', views.ForgotPasswordOtpVerify.as_view(), name='ForgotPasswordOtpVerify')

]