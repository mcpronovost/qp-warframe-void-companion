from django.contrib import admin

from qp.companion.models import (
    qpUserWarframeComponent,
    qpUserPrimaryWeaponComponent,
    qpUserSecondaryWeaponComponent,
    qpUserMeleeWeaponComponent
)


@admin.register(qpUserWarframeComponent)
class qpUserWarframeComponentAdmin(admin.ModelAdmin):
    list_display = ["component", "user"]


@admin.register(qpUserPrimaryWeaponComponent)
class qpUserPrimaryWeaponComponentAdmin(admin.ModelAdmin):
    list_display = ["component", "user"]


@admin.register(qpUserSecondaryWeaponComponent)
class qpUserSecondaryWeaponComponentAdmin(admin.ModelAdmin):
    list_display = ["component", "user"]


@admin.register(qpUserMeleeWeaponComponent)
class qpUserMeleeWeaponComponentAdmin(admin.ModelAdmin):
    list_display = ["component", "user"]
