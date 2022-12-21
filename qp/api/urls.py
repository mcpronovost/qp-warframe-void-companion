from django.urls import path
from knox import views as knox_views

from qp.api.views import qpPingView
from qp.api.views.auth import qpLoginView, qpRegisterView
from qp.api.views.me import (
    qpMeView,
    qpMeWarframeComponentsCreateView, qpMeWarframeComponentsDeleteView,
    qpMePrimaryWeaponComponentsCreateView, qpMePrimaryWeaponComponentsDeleteView,
    qpMeRelicsListView
)
from qp.api.views.users import qpUserRelicsListView
from qp.api.views.warframes import qpWarframeListView, qpWarframeDetailView
from qp.api.views.primaryweapons import qpPrimaryWeaponsListView, qpPrimaryWeaponsDetailView

urlpatterns = [
    path("", qpPingView.as_view()),

    path("me/", qpMeView.as_view()),
    path("me/warframes/components/create/", qpMeWarframeComponentsCreateView.as_view()),
    path("me/warframes/components/<int:pk>/delete/", qpMeWarframeComponentsDeleteView.as_view()),
    path("me/primary-weapons/components/create/", qpMePrimaryWeaponComponentsCreateView.as_view()),
    path("me/primary-weapons/components/<int:pk>/delete/", qpMePrimaryWeaponComponentsDeleteView.as_view()),
    path("me/relics/", qpMeRelicsListView.as_view()),

    path("users/<slug:slug>/relics/", qpUserRelicsListView.as_view()),

    path("warframes/", qpWarframeListView.as_view()),
    path("warframes/<int:pk>/", qpWarframeDetailView.as_view()),

    path("primary-weapons/", qpPrimaryWeaponsListView.as_view()),
    path("primary-weapons/<int:pk>/", qpPrimaryWeaponsDetailView.as_view()),

    path("register/", qpRegisterView.as_view(), name="auth_register"),
    path("login/", qpLoginView.as_view()),
    path("logout/", knox_views.LogoutView.as_view(), name="knox_logout"),
    path("logout-all/", knox_views.LogoutAllView.as_view(), name="knox_logoutall")
]