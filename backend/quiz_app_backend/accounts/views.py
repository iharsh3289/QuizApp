from django.http import JsonResponse
from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User  # Import the User model
from .models import User
from .serializers import *
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAuthenticatedOrReadOnly
from rest_framework.decorators import action
from django.core.mail import EmailMessage
from .Templates.email_reset import message, reset_Password_subject_mail , account_registeration_subject_mail
from .Utilities.otp_generator import generate_otp
from django.contrib.auth import login as Login, logout as Logout
from rest_framework.authentication import TokenAuthentication




class RegisterOtpVerify(APIView):
    def post(self, request):
        if request.data['otp'] == request.data['generated_otp']:
            Serilaizerdata = request.data['serailizer_data']
            print(Serilaizerdata)
            serializer = registerSerializer(data=Serilaizerdata)
            if serializer.is_valid(raise_exception=True):
                registerData = serializer.save()
                email = EmailMessage(subject="Account Created", body="Your Account Is Created Successfully", to=[registerData.email])
                email.send()
                data = {"email": registerData.email, "message":"Account Successfully Registered"}
                return JsonResponse({"success": True, "data": "Success: Account Created Successfully"}, status=200)
        else:
            return JsonResponse({"success": False, "data": "Failed: Invalid OTP"}, status=400)


class register(APIView):
    def post(self, request):
        email=request.data['email']
        user = User.objects.filter(email=email).first()
        # print(user.email)
        if user is not None:
            return JsonResponse({"success": False, "data": "Failed: User Already Exist"}, status=400)
        else:
            serializer = registerSerializer(data=request.data)
            print(serializer.initial_data)
            data = {}
            if serializer.is_valid(raise_exception=True):
                serializer.data['password'] = request.data['password']
                print(serializer.data)

                otp = generate_otp()
                body = message(otp)
                subject = account_registeration_subject_mail
                email = EmailMessage(subject=subject, body=body, to=[email])
                email.send()
                return JsonResponse(
                    {"success": True, "serailizer_data": serializer.initial_data, "generated_otp": otp, "data": "otp generated and sent"},
                    status=200)
            else:
                return JsonResponse({"success": False, "data": "Failed: Something went wrong"}, status=500)


class login(APIView):
    def post(self, request):
        serializer = loginSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.save()
            Login(request, user)
            token, created = Token.objects.get_or_create(user=user)
            return Response({'token': token.key, "message": "Logged In Succesfully"}, status=200)
            # return Response({"message":"Logged In Succesffully"}, status=200)
            # return Response({'Message':'Login Successful'},status=200)
        return Response('invalid username and password try again')

class ForgotPasswordOtpVerify(APIView):
    def post(self, request):
        if request.data['otp'] == request.data['generated_otp']:
            Serilaizerdata = request.data['serailizer_data']
            print(Serilaizerdata)
            serializer = resetpasswordSerializer(data=Serilaizerdata)
            if serializer.is_valid(raise_exception=True):
                Data = serializer.save()
                email = EmailMessage(subject="Password Changed", body="Your Account Password is Changed Successfully", to=[Data.email])
                email.send()
                data = {"email": Data.email, "message":"Account Successfully Registered"}
                return JsonResponse({"success": True, "data": "Success: Your Account Password is Changed Successfully"}, status=200)
        else:
            return JsonResponse({"success": False, "data": "Failed: Invalid OTP"}, status=400)


class forgotpassword(APIView):
    def post(self, request):
        email=request.data['email']
        user = User.objects.filter(email=email).first()
        # print(user.email)
        if user is None:
            return JsonResponse({"success": False, "data": "Failed: User Not Exist"}, status=400)
        else:
            serializer = resetpasswordSerializer(data=request.data)
            data = {}
            if serializer.is_valid(raise_exception=True):
                serializer.data['password'] = request.data['password']
                print(serializer.data)

                otp = generate_otp()
                body = message(otp)
                subject = reset_Password_subject_mail
                email = EmailMessage(subject=subject, body=body, to=[email])
                email.send()
                return JsonResponse(
                    {"success": True, "serailizer_data": serializer.initial_data, "generated_otp": otp, "data": "otp generated and sent"},
                    status=200)
            else:
                return JsonResponse({"success": False, "data": "Failed: Something went wrong"}, status=500)

# class forgotpassword(APIView):
#
#     def post(self, request):
#         try:
#             if (request.data.otp == otp):
#                 request.data.pop(0)
#                 serializer = resetpasswordSerializer(data=request.data)
#                 alldatas = {}
#                 if serializer.is_valid(raise_exception=True):
#                     serializer.save()
#                     alldatas['data'] = 'Password successfully Change'
#                     print(alldatas)
#                     return JsonResponse({"success": True, "data": alldatas}, status=200)
#                 else:
#                     return JsonResponse({"success": False, "data": "Failed: Something went wrong"}, status=500)
#             else:
#                 return JsonResponse({"success": False, "data": "Failed: Invalid OTP"}, status=400)
#         except User.DoesNotExist:
#             return JsonResponse({"success": False, "data": "User does not exist"}, status=404)




class resetpassword(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        otp = generate_otp()
        body = message(otp)
        subject = reset_Password_subject_mail
        email = EmailMessage(subject=subject, body=body, to=[request.user.email])
        email.send()
        if (request.data.otp == otp):
            request.data.pop(0)
            serializer = resetpasswordSerializer(data=request.data)
            alldatas = {}
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                alldatas['data'] = 'Password successfully Change'
                print(alldatas)
                return JsonResponse({"success": True, "data": alldatas}, status=200)
            else:
                return JsonResponse({"success": False, "data": "Failed: Something went wrong"}, status=500)
        else:
            return JsonResponse({"success": False, "data": "Failed: Invalid OTP"}, status=400)


class logout(APIView):

    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        print(request.headers)
        if request.user.is_authenticated:
            request.user.auth_token.delete()
            Logout(request)
            return Response("Successfully logged out")
        else:
            return Response("User is not authenticated", status=status.HTTP_401_UNAUTHORIZED)
