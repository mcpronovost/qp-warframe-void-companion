from django.contrib.auth import get_user_model, authenticate
from django.utils.translation import gettext_lazy as _
from django.utils.text import slugify
from rest_framework import serializers

from qp.users.models import qpUserProfile


User = get_user_model()


class qpUserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "username", "email", "password")
        extra_kwargs = {
            "email": {"write_only": True},
            "password": {"write_only": True}
        }

    def create(self, validated_data):
        if User.objects.filter(username=validated_data["username"]).count():
            raise serializers.ValidationError({"username": "A user with that username already exists."})
        if User.objects.filter(email=validated_data["email"]).count():
            raise serializers.ValidationError({"email": "A user with that email already exists."})
        if len(validated_data["password"]) < 6:
            raise serializers.ValidationError({"password": "That password is too short."})
        user = User.objects.create_user(
            validated_data["username"],
            validated_data["email"],
            validated_data["password"]
        )
        qpUserProfile.objects.create(
            user=user,
            name=validated_data["name"],
            slug=slugify(validated_data["name"])
        )
        return user

class qpUserLoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError(_("Invalid details."))

class qpUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "username")
