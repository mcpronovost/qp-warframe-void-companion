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
        fields = ["id", "username", "email", "name", "initial", "slug", "lang", "timezone", "is_completed", "is_public"]


class qpMeWarframeComponentsSerializer(serializers.ModelSerializer):

    class Meta:
        model = qpUserWarframeComponent
        fields = ["id"]


class qpMeRelicsSerializer(serializers.ModelSerializer):
    components = serializers.SerializerMethodField()
    rarities = serializers.SerializerMethodField()

    class Meta:
        model = qpRelic
        fields = ["id", "era", "name", "components", "rarities"]
    
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
                            "id": int(reward.component.pk),
                            "name": "%s - %s" % (
                                str(reward.component.warframe),
                                str(reward.component.get_name_display())
                            ),
                            "type": "warframe",
                            "warframe": str(reward.component.warframe),
                            "component": str(reward.component.name),
                            "percent": int(round(reward.percent * 100))
                        })
        except Exception as e:
            pass
        return result
    
    def get_rarities(self, obj):
        result = {
            "bronze": False,
            "silver": False,
            "gold": False
        }
        try:
            request = self.context.get("request")
            if request.user.is_authenticated:
                for reward in obj.warframe_rewards.all():
                    is_owned = reward.component.user_components.filter(
                        user=request.user
                    ).first()
                    if not is_owned:
                        percent = int(round(reward.percent * 100))
                        if percent < 10 and not result["gold"]:
                            result["gold"] = True
                        elif percent > 9 and percent < 20 and not result["silver"]:
                            result["silver"] = True
                        elif percent > 19 and not result["bronze"]:
                            result["bronze"] = True
        except Exception as e:
            pass
        return result
