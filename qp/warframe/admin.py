from django.contrib import admin

from qp.warframe.models import (
    qpWarframe, qpWarframeComponent,
    qpPrimaryWeapon, qpPrimaryWeaponComponent,
    qpSecondaryWeapon,
    qpMeleeWeapon,
    qpRelic,
    qpWarframeRelicReward, qpPrimaryWeaponRelicReward
)


class qpWarframeComponentInline(admin.StackedInline):
    model = qpWarframeComponent
    extra = 0


@admin.register(qpWarframe)
class qpWarframeAdmin(admin.ModelAdmin):
    inlines = [qpWarframeComponentInline]


class qpPrimaryWeaponComponentInline(admin.StackedInline):
    model = qpPrimaryWeaponComponent
    extra = 0


@admin.register(qpPrimaryWeapon)
class qpPrimaryWeaponAdmin(admin.ModelAdmin):
    list_display = ["name"]
    inlines = [qpPrimaryWeaponComponentInline]


@admin.register(qpSecondaryWeapon)
class qpSecondaryWeaponAdmin(admin.ModelAdmin):
    list_display = ["name"]


@admin.register(qpMeleeWeapon)
class qpMeleeWeaponAdmin(admin.ModelAdmin):
    list_display = ["name"]


@admin.register(qpWarframeRelicReward)
class qpWarframeRelicRewardAdmin(admin.ModelAdmin):
    list_display = ["component", "relic", "percent"]
    list_filter = ["percent", "component__warframe__name", "component__name"]
    search_fields = ["component__warframe__name", "relic__name"]


@admin.register(qpPrimaryWeaponRelicReward)
class qpPrimaryWeaponRelicRewardAdmin(admin.ModelAdmin):
    list_display = ["component", "relic", "percent"]
    list_filter = ["percent", "component__weapon__name", "component__name"]
    search_fields = ["component__weapon__name", "relic__name"]


class qpWarframeRelicRewardInline(admin.StackedInline):
    model = qpWarframeRelicReward
    extra = 0


class qpPrimaryWeaponRelicRewardInline(admin.StackedInline):
    model = qpPrimaryWeaponRelicReward
    extra = 0


@admin.register(qpRelic)
class qpRelicAdmin(admin.ModelAdmin):
    list_display = ["name", "era"]
    list_filter = ["era"]
    inlines = [qpWarframeRelicRewardInline, qpPrimaryWeaponRelicRewardInline]
