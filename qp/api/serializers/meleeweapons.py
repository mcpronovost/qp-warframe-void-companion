from django.utils.translation import gettext_lazy as _
from django.contrib.auth import get_user_model
from rest_framework import serializers

from qp.warframe.models import qpMeleeWeapon, qpMeleeWeaponComponent, qpMeleeWeaponRelicReward

User = get_user_model()


class qpMeleeWeaponSimpleSerializer(serializers.ModelSerializer):
    completion = serializers.SerializerMethodField()

    class Meta:
        model = qpMeleeWeapon
        fields = ["id", "name", "image_name", "completion"]
    
    def get_completion(self, obj):
        try:
            request = self.context.get("request")
            if request.user.is_authenticated:
                result = 0
                total = obj.components.count()
                for component in obj.components.all():
                    c = request.user.meleeweapon_components.filter(
                        component=component
                    ).first()
                    if c is not None:
                        result += (100/total)
                if result > 100:
                    result = 100
                return int(result)
            return 0
        except Exception as e:
            pass
        return 0


class qpMeleeWeaponSerializer(qpMeleeWeaponSimpleSerializer):
    components = serializers.SerializerMethodField()

    class Meta:
        model = qpMeleeWeapon
        fields = ["id", "name", "image_name", "completion", "components"]
    
    def get_components(self, obj):
        result = []
        try:
            request = self.context.get("request")
            for component in obj.components.all():
                if request.user.is_authenticated:
                    is_owned = component.user_components.filter(
                        user=request.user
                    ).first()
                    result.append({
                        "id": str(component.id),
                        "name": str(component.name),
                        "is_owned": bool(is_owned),
                        "relics": [
                            {
                                "fullname": str(x.relic),
                                "name": str(x.relic.name),
                                "era": x.relic.era,
                                "percent": "%s%%" % str(round(x.percent * 100))
                            } for x in component.rewards.all()
                        ]
                    })
        except Exception as e:
            pass
        return result


class qpMeleeWeaponComponentComponentSimpleSerializer(serializers.ModelSerializer):
    fullname = serializers.SerializerMethodField()

    class Meta:
        model = qpMeleeWeaponComponent
        fields = ["id", "name", "fullname", "quantity", "quantity_count", "weapon"]
        depth = 1
    
    def get_fullname(self, obj):
        return "%s" % (
            str(obj.__str__())
        )


class qpMeleeWeaponRelicRewardSimpleSerializer(serializers.ModelSerializer):
    is_owned = serializers.SerializerMethodField()
    component = qpMeleeWeaponComponentComponentSimpleSerializer()

    class Meta:
        model = qpMeleeWeaponRelicReward
        fields = ["id", "relic", "component", "percent", "is_owned"]
        depth = 1
    
    def get_is_owned(self, obj):
        try:
            request = self.context.get("request")
            kwargs = self.context.get("kwargs", {})
            if "slug" in kwargs:
                user = User.objects.filter(profile__slug=str(kwargs["slug"])).first()
            else:
                user = request.user
            if ("slug" in kwargs and user is not None) or ("slug" not in kwargs and user.is_authenticated):
                result = user.meleeweapon_components.filter(
                    component=obj.component
                ).first()
                return bool(result)
        except Exception as e:
            pass
        return False
