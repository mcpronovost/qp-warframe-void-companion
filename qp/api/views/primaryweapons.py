from django.utils.translation import gettext_lazy as _
from rest_framework import status
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.response import Response

from qp.api.permissions import qpIsAny, qpIsAuthenticated
from qp.warframe.models import qpPrimaryWeapon

from qp.api.serializers.primaryweapons import qpPrimaryWeaponSimpleSerializer, qpPrimaryWeaponSerializer


class qpPrimaryWeaponsListView(ListAPIView):
    """
    Primary Weapons `GET` list
    """
    permission_classes = [qpIsAny]
    queryset = qpPrimaryWeapon.objects.all()
    serializer_class = qpPrimaryWeaponSimpleSerializer
    page_size = 48

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)


class qpPrimaryWeaponsDetailView(RetrieveAPIView):
    """
    Primary Weapons `GET` detail
    """
    permission_classes = [qpIsAny]
    queryset = qpPrimaryWeapon.objects.all()
    serializer_class = qpPrimaryWeaponSerializer
    lookup_field = "pk"
