from django.utils.translation import gettext_lazy as _
from django.contrib.auth import get_user_model
from rest_framework import serializers

from qp.warframe.models import qpRelic

User = get_user_model()


class qpUserRelicsSerializer(serializers.ModelSerializer):
    components = serializers.SerializerMethodField()
    rarities = serializers.SerializerMethodField()

    class Meta:
        model = qpRelic
        fields = ["id", "era", "name", "components", "rarities"]
    
    def get_components(self, obj):
        result = []
        try:
            kwargs = self.context.get("kwargs")
            user = User.objects.filter(
              profile__slug=str(kwargs["slug"]),
              profile__is_public=True
            ).first()
            if user is not None:
                reward_types = ["warframes", "primary-weapons", "secondary-weapons", "melee-weapons"]
                for reward_type in reward_types:
                    rewards = []
                    # ===---
                    if reward_type == "warframes":
                        rewards = obj.warframe_rewards.all()
                    elif reward_type == "primary-weapons":
                        rewards = obj.primaryweapon_rewards.all()
                    elif reward_type == "secondary-weapons":
                        rewards = obj.secondaryweapon_rewards.all()
                    elif reward_type == "melee-weapons":
                        rewards = obj.meleeweapon_rewards.all()
                    # ===---
                    for reward in rewards:
                        name = "?"
                        warframe_name = None
                        weapon_name = None
                        if reward_type == "warframes":
                            name = str(reward.component.warframe)
                            warframe_name = name
                        elif reward_type in ["primary-weapons", "secondary-weapons", "melee-weapons"]:
                            name = str(reward.component.weapon)
                            weapon_name = name
                        # ===---
                        is_owned = reward.component.user_components.filter(
                            user=user
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
            pass
        return result
    
    def get_rarities(self, obj):
        result = {
            "bronze": False,
            "silver": False,
            "gold": False
        }
        try:
            kwargs = self.context.get("kwargs")
            user = User.objects.filter(
              profile__slug=str(kwargs["slug"]),
              profile__is_public=True
            ).first()
            if user is not None:
                reward_types = ["warframes", "primary-weapons", "secondary-weapons", "melee-weapons"]
                for reward_type in reward_types:
                    rewards = []
                    # ===---
                    if reward_type == "warframes":
                        rewards = obj.warframe_rewards.all()
                    elif reward_type == "primary-weapons":
                        rewards = obj.primaryweapon_rewards.all()
                    elif reward_type == "secondary-weapons":
                        rewards = obj.secondaryweapon_rewards.all()
                    elif reward_type == "melee-weapons":
                        rewards = obj.meleeweapon_rewards.all()
                    # ===---
                    for reward in rewards:
                        if result["gold"] == True and result["silver"] == True and result["gold"] == True:
                            break
                        is_owned = reward.component.user_components.filter(
                            user=user
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
