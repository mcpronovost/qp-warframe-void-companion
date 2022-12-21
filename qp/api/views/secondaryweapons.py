from django.utils.translation import gettext_lazy as _
from rest_framework.generics import ListAPIView, RetrieveAPIView

from qp.api.permissions import qpIsAny
from qp.warframe.models import qpSecondaryWeapon

from qp.api.serializers.secondaryweapons import qpSecondaryWeaponSimpleSerializer, qpSecondaryWeaponSerializer


class qpSecondaryWeaponsListView(ListAPIView):
    """
    Secondary Weapons `GET` list
    """
    permission_classes = [qpIsAny]
    queryset = qpSecondaryWeapon.objects.all()
    serializer_class = qpSecondaryWeaponSimpleSerializer

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)


class qpSecondaryWeaponsDetailView(RetrieveAPIView):
    """
    Secondary Weapons `GET` detail
    """
    permission_classes = [qpIsAny]
    queryset = qpSecondaryWeapon.objects.all()
    serializer_class = qpSecondaryWeaponSerializer
    lookup_field = "pk"
