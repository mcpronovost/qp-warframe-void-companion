from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.generics import ListAPIView, RetrieveUpdateAPIView, CreateAPIView, DestroyAPIView
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from django.db.models import Q
from django.http import QueryDict

from qp.warframe.models import (
    qpWarframeComponent,
    qpPrimaryWeaponComponent,
    qpSecondaryWeaponComponent,
    qpMeleeWeaponComponent,
    qpRelic
)
from qp.companion.models import (
    qpUserWarframeComponent,
    qpUserPrimaryWeaponComponent,
    qpUserSecondaryWeaponComponent,
    qpUserMeleeWeaponComponent
)
from qp.api.serializers.me import (
    qpMeSerializer,
    qpMeWarframeComponentsSerializer,
    qpMePrimaryWeaponComponentsSerializer,
    qpMeSecondaryWeaponComponentsSerializer,
    qpMeMeleeWeaponComponentsSerializer,
    qpMeRelicsSerializer
)


User = get_user_model()


class qpMeView(RetrieveUpdateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = User.objects.all()
    serializer_class = qpMeSerializer

    def get_object(self):
        try:
            return self.request.user.profile
        except Exception as e:
            print("Error on qpMeView : ", e)
        return None

    def patch(self, request, *args, **kwargs):
        instance = self.get_object()
        user = request.user
        if user is not None and user.is_authenticated and user.profile and instance.user == user:
            return self.partial_update(request, *args, **kwargs)
        return Response(status=status.HTTP_401_UNAUTHORIZED)


class qpMeWarframeComponentsCreateView(CreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = qpUserWarframeComponent.objects.all()
    serializer_class = qpMeWarframeComponentsSerializer
    lookup_field = "pk"

    def post(self, request, *args, **kwargs):
        pk = request.data.get("id", None)
        if pk is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        if "," not in pk:
            already_one = qpUserWarframeComponent.objects.filter(
                user=request.user,
                component__pk=pk
            ).first()
            if already_one is not None:
                return Response(status=status.HTTP_200_OK)
            return self.create(request, *args, **kwargs)
        elif "," in pk:
            return self.create_multiple(request, *args, **kwargs)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

    def perform_create(self, serializer):
        pk = int(self.request.data.get("id"))
        component = qpWarframeComponent.objects.filter(
            pk=pk
        ).first()
        serializer.save(user=self.request.user, component=component)

    def create_multiple(self, request, *args, **kwargs):
        component_ids = request.data.get("id", "")
        for component_id in component_ids.split(","):
            already_one = qpUserWarframeComponent.objects.filter(
                user=request.user,
                component__pk=component_id
            ).first()
            if already_one is not None:
                continue
            query_dict = QueryDict("", mutable=True)
            query_dict.update({"id": component_id})
            serializer = self.get_serializer(data=query_dict)
            serializer.is_valid(raise_exception=True)
            self.perform_create_multiple(serializer, component_id)
            headers = self.get_success_headers(serializer.data)
        return Response({}, status=status.HTTP_201_CREATED, headers=headers)

    def perform_create_multiple(self, serializer, component_id):
        pk = int(component_id)
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
        if pk > 0:
            instance = qpUserWarframeComponent.objects.filter(
                user=self.request.user,
                component__pk=pk
            ).first()
            if instance is not None:
                self.perform_destroy(instance)
                return Response(status=status.HTTP_204_NO_CONTENT)
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        else:
            component_ids = request.data.get("ids", "")
            for component_id in component_ids.split(","):
                instance = qpUserWarframeComponent.objects.filter(
                    user=self.request.user,
                    component__pk=int(component_id)
                ).first()
                if instance is not None:
                    self.perform_destroy(instance)
            return Response(status=status.HTTP_204_NO_CONTENT)


class qpMePrimaryWeaponComponentsCreateView(CreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = qpUserPrimaryWeaponComponent.objects.all()
    serializer_class = qpMePrimaryWeaponComponentsSerializer
    lookup_field = "pk"

    def post(self, request, *args, **kwargs):
        pk = request.data.get("id", None)
        if pk is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        if "," not in pk:
            already_one = qpUserPrimaryWeaponComponent.objects.filter(
                user=request.user,
                component__pk=pk
            ).first()
            if already_one is not None:
                return Response(status=status.HTTP_200_OK)
            return self.create(request, *args, **kwargs)
        elif "," in pk:
            return self.create_multiple(request, *args, **kwargs)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

    def perform_create(self, serializer):
        pk = int(self.request.data.get("id"))
        component = qpPrimaryWeaponComponent.objects.filter(
            pk=pk
        ).first()
        serializer.save(user=self.request.user, component=component)

    def create_multiple(self, request, *args, **kwargs):
        component_ids = request.data.get("id", "")
        for component_id in component_ids.split(","):
            already_one = qpUserPrimaryWeaponComponent.objects.filter(
                user=request.user,
                component__pk=component_id
            ).first()
            if already_one is not None:
                continue
            query_dict = QueryDict("", mutable=True)
            query_dict.update({"id": component_id})
            serializer = self.get_serializer(data=query_dict)
            serializer.is_valid(raise_exception=True)
            self.perform_create_multiple(serializer, component_id)
            headers = self.get_success_headers(serializer.data)
        return Response({}, status=status.HTTP_201_CREATED, headers=headers)

    def perform_create_multiple(self, serializer, component_id):
        pk = int(component_id)
        component = qpPrimaryWeaponComponent.objects.filter(
            pk=pk
        ).first()
        serializer.save(user=self.request.user, component=component)


class qpMePrimaryWeaponComponentsDeleteView(DestroyAPIView):
    permission_classes = [IsAuthenticated]
    queryset = qpUserPrimaryWeaponComponent.objects.all()
    serializer_class = qpMePrimaryWeaponComponentsSerializer
    lookup_field = "pk"

    def destroy(self, request, *args, **kwargs):
        pk = int(kwargs["pk"])
        if pk > 0:
            instance = qpUserPrimaryWeaponComponent.objects.filter(
                user=self.request.user,
                component__pk=pk
            ).first()
            if instance is not None:
                self.perform_destroy(instance)
                return Response(status=status.HTTP_204_NO_CONTENT)
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        else:
            component_ids = request.data.get("ids", "")
            for component_id in component_ids.split(","):
                instance = qpUserPrimaryWeaponComponent.objects.filter(
                    user=self.request.user,
                    component__pk=int(component_id)
                ).first()
                if instance is not None:
                    self.perform_destroy(instance)
            return Response(status=status.HTTP_204_NO_CONTENT)


class qpMeSecondaryWeaponComponentsCreateView(CreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = qpUserSecondaryWeaponComponent.objects.all()
    serializer_class = qpMeSecondaryWeaponComponentsSerializer
    lookup_field = "pk"

    def post(self, request, *args, **kwargs):
        pk = request.data.get("id", None)
        if pk is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        if "," not in pk:
            already_one = qpUserSecondaryWeaponComponent.objects.filter(
                user=request.user,
                component__pk=pk
            ).first()
            if already_one is not None:
                return Response(status=status.HTTP_200_OK)
            return self.create(request, *args, **kwargs)
        elif "," in pk:
            return self.create_multiple(request, *args, **kwargs)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

    def perform_create(self, serializer):
        pk = int(self.request.data.get("id"))
        component = qpSecondaryWeaponComponent.objects.filter(
            pk=pk
        ).first()
        serializer.save(user=self.request.user, component=component)

    def create_multiple(self, request, *args, **kwargs):
        component_ids = request.data.get("id", "")
        for component_id in component_ids.split(","):
            already_one = qpUserSecondaryWeaponComponent.objects.filter(
                user=request.user,
                component__pk=component_id
            ).first()
            if already_one is not None:
                continue
            query_dict = QueryDict("", mutable=True)
            query_dict.update({"id": component_id})
            serializer = self.get_serializer(data=query_dict)
            serializer.is_valid(raise_exception=True)
            self.perform_create_multiple(serializer, component_id)
            headers = self.get_success_headers(serializer.data)
        return Response({}, status=status.HTTP_201_CREATED, headers=headers)

    def perform_create_multiple(self, serializer, component_id):
        pk = int(component_id)
        component = qpSecondaryWeaponComponent.objects.filter(
            pk=pk
        ).first()
        serializer.save(user=self.request.user, component=component)


class qpMeSecondaryWeaponComponentsDeleteView(DestroyAPIView):
    permission_classes = [IsAuthenticated]
    queryset = qpUserSecondaryWeaponComponent.objects.all()
    serializer_class = qpMeSecondaryWeaponComponentsSerializer
    lookup_field = "pk"

    def destroy(self, request, *args, **kwargs):
        pk = int(kwargs["pk"])
        if pk > 0:
            instance = qpUserSecondaryWeaponComponent.objects.filter(
                user=self.request.user,
                component__pk=pk
            ).first()
            if instance is not None:
                self.perform_destroy(instance)
                return Response(status=status.HTTP_204_NO_CONTENT)
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        else:
            component_ids = request.data.get("ids", "")
            for component_id in component_ids.split(","):
                instance = qpUserSecondaryWeaponComponent.objects.filter(
                    user=self.request.user,
                    component__pk=int(component_id)
                ).first()
                if instance is not None:
                    self.perform_destroy(instance)
            return Response(status=status.HTTP_204_NO_CONTENT)


class qpMeMeleeWeaponComponentsCreateView(CreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = qpUserMeleeWeaponComponent.objects.all()
    serializer_class = qpMeMeleeWeaponComponentsSerializer
    lookup_field = "pk"

    def post(self, request, *args, **kwargs):
        pk = request.data.get("id", None)
        if pk is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        if "," not in pk:
            already_one = qpUserMeleeWeaponComponent.objects.filter(
                user=request.user,
                component__pk=pk
            ).first()
            if already_one is not None:
                return Response(status=status.HTTP_200_OK)
            return self.create(request, *args, **kwargs)
        elif "," in pk:
            return self.create_multiple(request, *args, **kwargs)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

    def perform_create(self, serializer):
        pk = int(self.request.data.get("id"))
        component = qpMeleeWeaponComponent.objects.filter(
            pk=pk
        ).first()
        serializer.save(user=self.request.user, component=component)

    def create_multiple(self, request, *args, **kwargs):
        component_ids = request.data.get("id", "")
        for component_id in component_ids.split(","):
            already_one = qpUserMeleeWeaponComponent.objects.filter(
                user=request.user,
                component__pk=component_id
            ).first()
            if already_one is not None:
                continue
            query_dict = QueryDict("", mutable=True)
            query_dict.update({"id": component_id})
            serializer = self.get_serializer(data=query_dict)
            serializer.is_valid(raise_exception=True)
            self.perform_create_multiple(serializer, component_id)
            headers = self.get_success_headers(serializer.data)
        return Response({}, status=status.HTTP_201_CREATED, headers=headers)

    def perform_create_multiple(self, serializer, component_id):
        pk = int(component_id)
        component = qpMeleeWeaponComponent.objects.filter(
            pk=pk
        ).first()
        serializer.save(user=self.request.user, component=component)


class qpMeMeleeWeaponComponentsDeleteView(DestroyAPIView):
    permission_classes = [IsAuthenticated]
    queryset = qpUserMeleeWeaponComponent.objects.all()
    serializer_class = qpMeMeleeWeaponComponentsSerializer
    lookup_field = "pk"

    def destroy(self, request, *args, **kwargs):
        pk = int(kwargs["pk"])
        if pk > 0:
            instance = qpUserMeleeWeaponComponent.objects.filter(
                user=self.request.user,
                component__pk=pk
            ).first()
            if instance is not None:
                self.perform_destroy(instance)
                return Response(status=status.HTTP_204_NO_CONTENT)
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        else:
            component_ids = request.data.get("ids", "")
            for component_id in component_ids.split(","):
                instance = qpUserMeleeWeaponComponent.objects.filter(
                    user=self.request.user,
                    component__pk=int(component_id)
                ).first()
                if instance is not None:
                    self.perform_destroy(instance)
            return Response(status=status.HTTP_204_NO_CONTENT)


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
                unowned_warframe_components = qpWarframeComponent.objects.exclude(
                    user_components__in=request.user.warframe_components.all()
                )
                unowned_primaryweapon_components = qpPrimaryWeaponComponent.objects.exclude(
                    user_components__in=request.user.primaryweapon_components.all()
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
