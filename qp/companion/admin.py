from django.contrib import admin

from qp.companion.models import qpUserWarframeComponent


@admin.register(qpUserWarframeComponent)
class qpUserWarframeComponentAdmin(admin.ModelAdmin):
    list_display = ["component", "user"]
