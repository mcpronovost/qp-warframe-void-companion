from django.contrib import admin

from qp.warframe.models import (
    qpWarframe, qpWarframeComponent,
    qpPrimaryWeapon, qpPrimaryWeaponComponent,
    qpSecondaryWeapon, qpSecondaryWeaponComponent,
    qpMeleeWeapon, qpMeleeWeaponComponent,
    qpRelic,
    qpWarframeRelicReward,
    qpPrimaryWeaponRelicReward,
    qpSecondaryWeaponRelicReward,
    qpMeleeWeaponRelicReward
)


class qpWarframeComponentInline(admin.StackedInline):
    model = qpWarframeComponent
    extra = 0


class qpPrimaryWeaponComponentInline(admin.StackedInline):
    model = qpPrimaryWeaponComponent
    extra = 0


class qpSecondaryWeaponComponentInline(admin.StackedInline):
    model = qpSecondaryWeaponComponent
    extra = 0


class qpMeleeWeaponComponentInline(admin.StackedInline):
    model = qpMeleeWeaponComponent
    extra = 0


# ===---


@admin.register(qpWarframe)
class qpWarframeAdmin(admin.ModelAdmin):
    inlines = [qpWarframeComponentInline]


@admin.register(qpPrimaryWeapon)
class qpPrimaryWeaponAdmin(admin.ModelAdmin):
    list_display = ["name"]
    inlines = [qpPrimaryWeaponComponentInline]


@admin.register(qpSecondaryWeapon)
class qpSecondaryWeaponAdmin(admin.ModelAdmin):
    list_display = ["name"]
    inlines = [qpSecondaryWeaponComponentInline]


@admin.register(qpMeleeWeapon)
class qpMeleeWeaponAdmin(admin.ModelAdmin):
    list_display = ["name"]
    inlines = [qpMeleeWeaponComponentInline]


# ===---


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


@admin.register(qpSecondaryWeaponRelicReward)
class qpSecondaryWeaponRelicRewardAdmin(admin.ModelAdmin):
    list_display = ["component", "relic", "percent"]
    list_filter = ["percent", "component__weapon__name", "component__name"]
    search_fields = ["component__weapon__name", "relic__name"]


@admin.register(qpMeleeWeaponRelicReward)
class qpMeleeWeaponRelicRewardAdmin(admin.ModelAdmin):
    list_display = ["component", "relic", "percent"]
    list_filter = ["percent", "component__weapon__name", "component__name"]
    search_fields = ["component__weapon__name", "relic__name"]


# ===---


class qpWarframeRelicRewardInline(admin.StackedInline):
    model = qpWarframeRelicReward
    extra = 0


class qpPrimaryWeaponRelicRewardInline(admin.StackedInline):
    model = qpPrimaryWeaponRelicReward
    extra = 0


class qpSecondaryWeaponRelicRewardInline(admin.StackedInline):
    model = qpSecondaryWeaponRelicReward
    extra = 0


class qpMeleeWeaponRelicRewardInline(admin.StackedInline):
    model = qpMeleeWeaponRelicReward
    extra = 0


@admin.register(qpRelic)
class qpRelicAdmin(admin.ModelAdmin):
    list_display = ["name", "era"]
    list_filter = ["era"]
    inlines = [
        qpWarframeRelicRewardInline,
        qpPrimaryWeaponRelicRewardInline,
        qpSecondaryWeaponRelicRewardInline
    ]
