from django.utils.translation import gettext_lazy as _
from django.contrib.auth import get_user_model
from rest_framework import serializers

from qp.users.models import qpUserProfile
from qp.companion.models import (
    qpUserWarframeComponent,
    qpUserPrimaryWeaponComponent,
    qpUserSecondaryWeaponComponent,
    qpUserMeleeWeaponComponent
)
from qp.warframe.models import qpRelic

User = get_user_model()


class qpMeSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True, source="user.id")
    username = serializers.CharField(read_only=True, source="user.username")
    email = serializers.CharField(read_only=True, source="user.email")

    class Meta:
        model = qpUserProfile
        fields = ["id", "username", "email", "name", "initial", "slug", "lang", "timezone", "hide_completed_warframes", "hide_completed_primaryweapons", "hide_completed_secondaryweapons", "hide_completed_meleeweapons", "hide_completed_archwings", "hide_completed_companions", "is_completed", "is_public"]


class qpMeWarframeComponentsSerializer(serializers.ModelSerializer):

    class Meta:
        model = qpUserWarframeComponent
        fields = ["id"]


class qpMePrimaryWeaponComponentsSerializer(serializers.ModelSerializer):

    class Meta:
        model = qpUserPrimaryWeaponComponent
        fields = ["id"]


class qpMeSecondaryWeaponComponentsSerializer(serializers.ModelSerializer):

    class Meta:
        model = qpUserSecondaryWeaponComponent
        fields = ["id"]


class qpMeMeleeWeaponComponentsSerializer(serializers.ModelSerializer):

    class Meta:
        model = qpUserMeleeWeaponComponent
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
                reward_types = ["warframes", "primary-weapons", "secondary-weapons"]
                for reward_type in reward_types:
                    rewards = []
                    # ===---
                    if reward_type == "warframes":
                        rewards = obj.warframe_rewards.all()
                    elif reward_type == "primary-weapons":
                        rewards = obj.primaryweapon_rewards.all()
                    elif reward_type == "secondary-weapons":
                        rewards = obj.secondaryweapon_rewards.all()
                    # ===---
                    for reward in rewards:
                        name = "?"
                        warframe_name = None
                        weapon_name = None
                        if reward_type == "warframes":
                            name = str(reward.component.warframe)
                            warframe_name = name
                        elif reward_type in ["primary-weapons", "secondary-weapons"]:
                            name = str(reward.component.weapon)
                            weapon_name = name
                        # ===---
                        is_owned = reward.component.user_components.filter(
                            user=request.user
                        ).first()
                        if not is_owned:
                            result.append({
                                "id": int(reward.component.pk),
                                "name": "%s - %s" % (
                                    name,
                                    str(reward.component.get_name_display())
                                ),
                                "type": "primary-weapons",
                                "warframe": warframe_name,
                                "weapon": weapon_name,
                                "component": str(reward.component.name),
                                "percent": int(round(reward.percent * 100))
                            })
        except Exception as e:
            print("Error : ", e)
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
                reward_types = ["warframes", "primary-weapons", "secondary-weapons"]
                for reward_type in reward_types:
                    rewards = []
                    # ===---
                    if reward_type == "warframes":
                        rewards = obj.warframe_rewards.all()
                    elif reward_type == "primary-weapons":
                        rewards = obj.primaryweapon_rewards.all()
                    elif reward_type == "secondary-weapons":
                        rewards = obj.secondaryweapon_rewards.all()
                    # ===---
                    for reward in rewards:
                        if result["gold"] == True and result["silver"] == True and result["gold"] == True:
                            break
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
