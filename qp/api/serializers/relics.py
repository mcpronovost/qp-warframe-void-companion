from django.utils.translation import gettext_lazy as _
from rest_framework import serializers

from qp.api.serializers.warframes import qpWarframeRelicRewardSimpleSerializer
from qp.api.serializers.primaryweapons import qpPrimaryWeaponRelicRewardSimpleSerializer
from qp.api.serializers.secondaryweapons import qpSecondaryWeaponRelicRewardSimpleSerializer
from qp.api.serializers.meleeweapons import qpMeleeWeaponRelicRewardSimpleSerializer

from qp.warframe.models import qpRelic


class qpRelicsSerializer(serializers.ModelSerializer):
    warframe_rewards = qpWarframeRelicRewardSimpleSerializer(many=True)
    primaryweapon_rewards = qpPrimaryWeaponRelicRewardSimpleSerializer(many=True)
    secondaryweapon_rewards = qpSecondaryWeaponRelicRewardSimpleSerializer(many=True)
    meleeweapon_rewards = qpMeleeWeaponRelicRewardSimpleSerializer(many=True)

    class Meta:
        model = qpRelic
        fields = [
            "id", "era", "name",
            "warframe_rewards",
            "primaryweapon_rewards",
            "secondaryweapon_rewards",
            "meleeweapon_rewards",
        ]