from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.generics import ListAPIView, RetrieveAPIView, CreateAPIView, DestroyAPIView
from rest_framework.response import Response
from django.contrib.auth import get_user_model

from qp.warframe.models import qpWarframeComponent, qpRelic
from qp.companion.models import qpUserWarframeComponent
from qp.api.serializers.me import qpMeSerializer, qpMeWarframeComponentsSerializer, qpMeRelicsSerializer


User = get_user_model()


class qpMeView(RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    queryset = User.objects.all()
    serializer_class = qpMeSerializer

    def get_object(self):
        try:
            return self.request.user.profile
        except Exception as e:
            print("Error on qpMeView : ", e)
        return None


class qpMeWarframeComponentsCreateView(CreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = qpUserWarframeComponent.objects.all()
    serializer_class = qpMeWarframeComponentsSerializer
    lookup_field = "pk"

    def post(self, request, *args, **kwargs):
        pk = int(request.data.get("id"))
        already_one = qpUserWarframeComponent.objects.filter(
            user=request.user,
            component__pk=pk
        ).first()
        if already_one is not None:
            return Response(status=status.HTTP_200_OK)
        return self.create(request, *args, **kwargs)

    def perform_create(self, serializer):
        pk = int(self.request.data.get("id"))
        component = qpWarframeComponent.objects.filter(
            pk=pk
        ).first()
        serializer.save(user=self.request.user, component=component)


class qpMeWarframeComponentsDeleteView(DestroyAPIView):
    permission_classes = [IsAuthenticated]
    queryset = qpUserWarframeComponent.objects.all()
    serializer_class = qpMeWarframeComponentsSerializer
    lookup_field = "pk"

    def destroy(self, request, *args, **kwargs):
        pk = int(kwargs["pk"])
        instance = qpUserWarframeComponent.objects.filter(
            user=self.request.user,
            component__pk=pk
        ).first()
        if instance is not None:
            self.perform_destroy(instance)
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(status=status.HTTP_401_UNAUTHORIZED)


class qpMeRelicsListView(ListAPIView):
    permission_classes = [IsAuthenticated]
    queryset = qpRelic.objects.all()
    serializer_class = qpMeRelicsSerializer

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset(request))
        queryset = queryset.extra(
            select={
                "is1":" era='Lith'",
                "is2": " era='Meso'",
                "is3": " era='Neo'",
                "is4": " era='Axi'"
            }
        ).extra(order_by = ["-is1", "-is2", "-is3", "-is4"])
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    def get_queryset(self, request):
        queryset = qpRelic.objects.none()
        era = request.GET.get("era", None)
        try:
            if request.user.is_authenticated:
                owned_warframe_components = request.user.warframe_components.all()
                unowned_warframe_components = qpWarframeComponent.objects.exclude(
                    user_components__in=owned_warframe_components
                )
                all_relics = qpRelic.objects.filter(
                    warframe_rewards__component__in=unowned_warframe_components
                )
                if era is not None:
                    all_relics = all_relics.filter(
                        era=era
                    )
                return all_relics.distinct()
        except Exception as e:
            print("Error : ", e)
            pass
        return queryset
