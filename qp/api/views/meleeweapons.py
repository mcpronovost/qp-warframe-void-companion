from django.utils.translation import gettext_lazy as _
from rest_framework.generics import ListAPIView, RetrieveAPIView

from qp.api.permissions import qpIsAny
from qp.warframe.models import qpMeleeWeapon

from qp.api.serializers.meleeweapons import qpMeleeWeaponSimpleSerializer, qpMeleeWeaponSerializer


class qpMeleeWeaponsListView(ListAPIView):
    """
    Melee Weapons `GET` list
    """
    permission_classes = [qpIsAny]
    queryset = qpMeleeWeapon.objects.all()
    serializer_class = qpMeleeWeaponSimpleSerializer
    page_size = 48

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)


class qpMeleeWeaponsDetailView(RetrieveAPIView):
    """
    Melee Weapons `GET` detail
    """
    permission_classes = [qpIsAny]
    queryset = qpMeleeWeapon.objects.all()
    serializer_class = qpMeleeWeaponSerializer
    lookup_field = "pk"
