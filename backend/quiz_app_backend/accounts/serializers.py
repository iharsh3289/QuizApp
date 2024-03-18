from drf_extra_fields.fields import Base64ImageField
from rest_framework import serializers
from .models import User
from django.contrib import auth
from rest_framework import exceptions
from django.contrib.auth import authenticate


class registerSerializer(serializers.ModelSerializer):
    email=serializers.EmailField(max_length=255,min_length=4)
    password=serializers.CharField(max_length=100, write_only=True)
    name=serializers.CharField(max_length=100)
    image=Base64ImageField(allow_null=True, required=False)
    class Meta:
        model=User
        fields=['email','password','name','image']

    def save(self):
        email=self.validated_data['email']
        if User.objects.filter(email=email).exists():
            raise serializers.ValidationError({'account':'account is already exists'})
        else:

            user = User.objects.create_user(
                email=self.validated_data['email'],
                password=self.validated_data['password'],
                name=self.validated_data['name'])
            user.image = self.validated_data['image']
            user.save()
        return user


class loginSerializer(serializers.ModelSerializer):
    email=serializers.CharField(max_length=100)
    password=serializers.CharField(max_length=100, write_only=True)
    
    class Meta:
        model=User
        fields=['email','password']
    
    def save(self):
        email=self.validated_data['email']
        password=self.validated_data['password']
        if email and password:
            user=authenticate(email=email,password=password)
            if user:
                if user.is_active:
                    return user
                else:
                    raise serializers.ValidationError({'user':'user is not active'})
            else:
                raise serializers.ValidationError({'user':'please enter valid user credentails'})
        else:
            raise serializers.ValidationError({'error':'username and password not to be blank'})


class resetpasswordSerializer(serializers.ModelSerializer):
    email=serializers.CharField(max_length=100)
    password=serializers.CharField(max_length=100)
    
    class Meta:
        model=User
        fields=['email','password']
    
    def save(self):
        email=self.validated_data['email']
        password=self.validated_data['password']

        if User.objects.filter(email=email).exists():
            user=User.objects.get(email=email)
            user.set_password(password)
            user.save()
            return user
        else:
            raise serializers.ValidationError({'error':'please enter valid crendentials'})