from django.utils.translation import gettext_lazy as _
from rest_framework import serializers

from qp.warframe.models import qpSecondaryWeapon


class qpSecondaryWeaponSimpleSerializer(serializers.ModelSerializer):
    completion = serializers.SerializerMethodField()

    class Meta:
        model = qpSecondaryWeapon
        fields = ["id", "name", "image_name", "completion"]
    
    def get_completion(self, obj):
        try:
            request = self.context.get("request")
            if request.user.is_authenticated:
                result = 0
                total = obj.components.count()
                for component in obj.components.all():
                    c = request.user.secondaryweapon_components.filter(
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


class qpSecondaryWeaponSerializer(qpSecondaryWeaponSimpleSerializer):
    components = serializers.SerializerMethodField()

    class Meta:
        model = qpSecondaryWeapon
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
