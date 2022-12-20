from django.contrib import admin

from qp.warframe.models import (
    qpWarframe, qpWarframeComponent,
    qpRelic, qpWarframeRelicReward
)


class qpWarframeComponentInline(admin.StackedInline):
    model = qpWarframeComponent
    extra = 0


@admin.register(qpWarframe)
class qpWarframeAdmin(admin.ModelAdmin):
    inlines = [qpWarframeComponentInline]


@admin.register(qpWarframeRelicReward)
class qpWarframeRelicRewardAdmin(admin.ModelAdmin):
    list_display = ["component", "percent"]
    list_filter = ["percent"]


class qpWarframeRelicRewardInline(admin.StackedInline):
    model = qpWarframeRelicReward
    extra = 0


@admin.register(qpRelic)
class qpRelicAdmin(admin.ModelAdmin):
    list_display = ["name", "era"]
    list_filter = ["era"]
    inlines = [qpWarframeRelicRewardInline]
