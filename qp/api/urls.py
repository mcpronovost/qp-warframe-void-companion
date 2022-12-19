from django.urls import path
from knox import views as knox_views

from qp.api.views import qpPingView
from qp.api.views.auth import qpLoginView, qpRegisterView
from qp.api.views.me import qpMeView, qpMeWarframeComponentsCreateView, qpMeWarframeComponentsDeleteView, qpMeRelicsListView
from qp.api.views.warframes import qpWarframeListView, qpWarframeDetailView

urlpatterns = [
    path("", qpPingView.as_view()),

    path("me/", qpMeView.as_view()),
    path("me/warframes/components/create/", qpMeWarframeComponentsCreateView.as_view()),
    path("me/warframes/components/<int:pk>/delete/", qpMeWarframeComponentsDeleteView.as_view()),
    path("me/relics/", qpMeRelicsListView.as_view()),

    path("warframes/", qpWarframeListView.as_view()),
    path("warframes/<int:pk>/", qpWarframeDetailView.as_view()),

    path("register/", qpRegisterView.as_view(), name="auth_register"),
    path("login/", qpLoginView.as_view()),
    path("logout/", knox_views.LogoutView.as_view(), name="knox_logout"),
    path("logout-all/", knox_views.LogoutAllView.as_view(), name="knox_logoutall")
]