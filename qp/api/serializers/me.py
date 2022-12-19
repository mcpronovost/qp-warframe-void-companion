from django.utils.translation import gettext_lazy as _
from django.contrib.auth import get_user_model
from rest_framework import serializers

from qp.users.models import qpUserProfile
from qp.companion.models import qpUserWarframeComponent
from qp.warframe.models import qpRelic

User = get_user_model()


class qpMeSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True, source="user.id")
    username = serializers.CharField(read_only=True, source="user.username")
    email = serializers.CharField(read_only=True, source="user.email")

    class Meta:
        model = qpUserProfile
        fields = ["id", "username", "email", "name", "initial", "slug", "lang", "timezone"]


class qpMeWarframeComponentsSerializer(serializers.ModelSerializer):

    class Meta:
        model = qpUserWarframeComponent
        fields = ["id"]


class qpMeRelicsSerializer(serializers.ModelSerializer):
    components = serializers.SerializerMethodField()

    class Meta:
        model = qpRelic
        fields = ["id", "era", "name", "components"]
    
    def get_components(self, obj):
        result = []
        try:
            request = self.context.get("request")
            if request.user.is_authenticated:
                for reward in obj.warframe_rewards.all():
                    is_owned = reward.component.user_components.filter(
                        user=request.user
                    ).first()
                    if not is_owned:
                        result.append({
                            "name": str(reward.component),
                            "warframe": str(reward.component.warframe),
                            "component": str(reward.component.get_name_display()),
                            "percent": "%s%%" % str(round(reward.percent * 100))
                        })
        except Exception as e:
            pass
        return result
