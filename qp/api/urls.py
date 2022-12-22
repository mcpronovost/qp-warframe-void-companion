from django.urls import path
from knox import views as knox_views

from qp.api.views import qpPingView
from qp.api.views.auth import qpLoginView, qpRegisterView
from qp.api.views.me import (
    qpMeView,
    qpMeWarframeComponentsCreateView, qpMeWarframeComponentsDeleteView,
    qpMePrimaryWeaponComponentsCreateView, qpMePrimaryWeaponComponentsDeleteView,
    qpMeSecondaryWeaponComponentsCreateView, qpMeSecondaryWeaponComponentsDeleteView,
    qpMeMeleeWeaponComponentsCreateView, qpMeMeleeWeaponComponentsDeleteView,
    qpMeRelicsListView
)
from qp.api.views.users import qpUserRelicsListView
from qp.api.views.warframes import qpWarframeListView, qpWarframeDetailView
from qp.api.views.primaryweapons import qpPrimaryWeaponsListView, qpPrimaryWeaponsDetailView
from qp.api.views.secondaryweapons import qpSecondaryWeaponsListView, qpSecondaryWeaponsDetailView
from qp.api.views.meleeweapons import qpMeleeWeaponsListView, qpMeleeWeaponsDetailView
from qp.api.views.relics import qpRelicsListView

urlpatterns = [
    path("", qpPingView.as_view()),

    path("me/", qpMeView.as_view()),
    path("me/warframes/components/create/", qpMeWarframeComponentsCreateView.as_view()),
    path("me/warframes/components/<int:pk>/delete/", qpMeWarframeComponentsDeleteView.as_view()),
    path("me/primary-weapons/components/create/", qpMePrimaryWeaponComponentsCreateView.as_view()),
    path("me/primary-weapons/components/<int:pk>/delete/", qpMePrimaryWeaponComponentsDeleteView.as_view()),
    path("me/secondary-weapons/components/create/", qpMeSecondaryWeaponComponentsCreateView.as_view()),
    path("me/secondary-weapons/components/<int:pk>/delete/", qpMeSecondaryWeaponComponentsDeleteView.as_view()),
    path("me/melee-weapons/components/create/", qpMeMeleeWeaponComponentsCreateView.as_view()),
    path("me/melee-weapons/components/<int:pk>/delete/", qpMeMeleeWeaponComponentsDeleteView.as_view()),
    path("me/relics/", qpMeRelicsListView.as_view()),

    path("users/<slug:slug>/relics/", qpUserRelicsListView.as_view()),

    path("warframes/", qpWarframeListView.as_view()),
    path("warframes/<int:pk>/", qpWarframeDetailView.as_view()),

    path("primary-weapons/", qpPrimaryWeaponsListView.as_view()),
    path("primary-weapons/<int:pk>/", qpPrimaryWeaponsDetailView.as_view()),

    path("secondary-weapons/", qpSecondaryWeaponsListView.as_view()),
    path("secondary-weapons/<int:pk>/", qpSecondaryWeaponsDetailView.as_view()),

    path("melee-weapons/", qpMeleeWeaponsListView.as_view()),
    path("melee-weapons/<int:pk>/", qpMeleeWeaponsDetailView.as_view()),

    path("relics/", qpRelicsListView.as_view()),

    path("register/", qpRegisterView.as_view(), name="auth_register"),
    path("login/", qpLoginView.as_view()),
    path("logout/", knox_views.LogoutView.as_view(), name="knox_logout"),
    path("logout-all/", knox_views.LogoutAllView.as_view(), name="knox_logoutall")
]