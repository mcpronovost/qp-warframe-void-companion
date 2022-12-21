from rest_framework.permissions import AllowAny
from rest_framework import status
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from django.db.models import Q

from qp.warframe.models import qpWarframeComponent, qpPrimaryWeaponComponent, qpRelic
from qp.api.serializers.users import qpUserRelicsSerializer


User = get_user_model()


class qpUserRelicsListView(ListAPIView):
    permission_classes = [AllowAny]
    queryset = qpRelic.objects.all()
    serializer_class = qpUserRelicsSerializer
    page_type = "users"

    def get(self, request, *args, **kwargs):
        user = User.objects.filter(
          profile__slug=str(kwargs["slug"]),
          profile__is_public=True
        ).first()
        if user is None:
            return Response(status=status.HTTP_404_NOT_FOUND)
        return self.list(request, *args, **kwargs)

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset(request))
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, context={"request": request, "kwargs": kwargs}, many=True)
            return self.get_paginated_response(serializer.data)
        serializer = self.get_serializer(queryset, context={"request": request, "kwargs": kwargs}, many=True)
        return Response(serializer.data)

    def get_queryset(self, request):
        user = User.objects.filter(
          profile__slug=str(self.kwargs["slug"]),
          profile__is_public=True
        ).first()
        queryset = qpRelic.objects.none()
        era = request.GET.get("era", None)
        try:
            if user is not None:
                unowned_warframe_components = qpWarframeComponent.objects.exclude(
                    user_components__in=user.warframe_components.all()
                )
                unowned_primaryweapon_components = qpPrimaryWeaponComponent.objects.exclude(
                    user_components__in=user.primaryweapon_components.all()
                )
                # ===---
                all_relics = qpRelic.objects.filter(
                    Q(warframe_rewards__component__in=unowned_warframe_components) |
                    Q(primaryweapon_rewards__component__in=unowned_primaryweapon_components)
                )
                # ===---
                if era is not None:
                    all_relics = all_relics.filter(
                        era=era
                    )
                return all_relics.distinct()
        except Exception as e:
            print("Error : ", e)
            pass
        return queryset
