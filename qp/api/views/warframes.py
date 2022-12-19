from django.utils.translation import gettext_lazy as _
from rest_framework import status
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.response import Response

from qp.api.permissions import qpIsAny, qpIsAuthenticated
from qp.warframe.models import qpWarframe

from qp.api.serializers.warframes import qpWarframeSimpleSerializer, qpWarframeSerializer


class qpWarframeListView(ListAPIView):
    """
    RPG `GET` list
    """
    permission_classes = [qpIsAny]
    queryset = qpWarframe.objects.all()
    serializer_class = qpWarframeSimpleSerializer

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)


class qpWarframeDetailView(RetrieveAPIView):
    """
    RPG `GET` detail
    """
    permission_classes = [qpIsAny]
    queryset = qpWarframe.objects.all()
    serializer_class = qpWarframeSerializer
    lookup_field = "pk"
