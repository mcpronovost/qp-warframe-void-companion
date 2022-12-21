from django.contrib import admin

from qp.companion.models import qpUserWarframeComponent, qpUserPrimaryWeaponComponent


@admin.register(qpUserWarframeComponent)
class qpUserWarframeComponentAdmin(admin.ModelAdmin):
    list_display = ["component", "user"]


@admin.register(qpUserPrimaryWeaponComponent)
class qpUserPrimaryWeaponComponentAdmin(admin.ModelAdmin):
    list_display = ["component", "user"]
