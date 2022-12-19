from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, re_path
from qp.settings import STATIC_URL, STATIC_ROOT, MEDIA_URL, MEDIA_ROOT

from qp.views import index, warframes, app

urlpatterns = [
    re_path(r"^admin/", admin.site.urls),
    re_path(r"^api-auth/", include("rest_framework.urls")),
    re_path(r"^api/auth/", include("knox.urls")),
    re_path(r"^api/v1/", include("qp.api.urls")),
] + static(STATIC_URL, document_root=STATIC_ROOT) + static(MEDIA_URL, document_root=MEDIA_ROOT) + [
    re_path(r"^app/", app),
    re_path(r"^warframes/", warframes),
    re_path(r"^", index)
]
