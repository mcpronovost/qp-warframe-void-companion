from rest_framework.permissions import AllowAny
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from django.db.models.functions import Substr, Length

from qp.warframe.models import (
    qpRelic
)
from qp.api.serializers.relics import (
    qpRelicsSerializer
)


class qpRelicsListView(ListAPIView):
    permission_classes = [AllowAny]
    queryset = qpRelic.objects.all()
    serializer_class = qpRelicsSerializer
    page_size = 48

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset(request))
        queryset = queryset.annotate(
            letter=Substr("name", 1, 1),
            length=Length("name")
        ).extra(
            select={
                "is1":" era='Lith'",
                "is2": " era='Meso'",
                "is3": " era='Neo'",
                "is4": " era='Axi'"
            }
        ).extra(order_by = ["-is1", "-is2", "-is3", "-is4", "letter", "length", "name"])
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    def get_queryset(self, request):
        queryset = qpRelic.objects.all()
        era = request.GET.get("era", None)
        try:
            if era is not None:
                queryset = queryset.filter(
                    era=era
                )
            return queryset.distinct()
        except Exception as e:
            print("Error : ", e)
            pass
        return queryset
