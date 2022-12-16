from django.db import models
from django.utils.translation import gettext_lazy as _

class qpWarframe(models.Model):
    name = models.CharField(
        verbose_name=_("Name"),
        max_length=120,
        blank=False,
        null=False
    )
    image_name = models.CharField(
        verbose_name=_("Image Name"),
        max_length=250,
        blank=True,
        null=True
    )

    class Meta:
        verbose_name = _("Warframe")
        verbose_name_plural = _("Warframes")
        ordering = ["name"]
    
    def __str__(self):
        return "%s" % (
            str(self.name)
        )

class qpWarframeComponent(models.Model):
    CHOIX_COMPONENTS = [
        ("blueprint", _("Blueprint")),
        ("neuroptics", _("Neuroptics")),
        ("chassis", _("Chassis")),
        ("systems", _("Systems"))
    ]
    warframe = models.ForeignKey(
        qpWarframe,
        on_delete=models.CASCADE,
        related_name="components",
        verbose_name=_("Warframe"),
        blank=False,
        null=False
    )
    name = models.CharField(
        verbose_name=_("Name"),
        max_length=32,
        choices=CHOIX_COMPONENTS,
        blank=False,
        null=False
    )

    class Meta:
        verbose_name = _("Warframe Component")
        verbose_name_plural = _("Warframe Components")
        ordering = ["warframe", "name"]
    
    def __str__(self):
        return "%s - %s" % (
            str(self.warframe.name),
            str(self.name)
        )


class qpRelic(models.Model):
    CHOIX_ERA = [
        ("Lith", "Lith"),
        ("Meso", "Meso"),
        ("Neo", "Neo"),
        ("Axi", "Axi")
    ]
    era = models.CharField(
        verbose_name=_("Era"),
        max_length=32,
        choices=CHOIX_ERA,
        blank=False,
        null=False
    )
    name = models.CharField(
        verbose_name=_("Name"),
        max_length=32,
        blank=False,
        null=False
    )

    class Meta:
        verbose_name = _("Relic")
        verbose_name_plural = _("Relics")
        ordering = ["era", "name"]
    
    def __str__(self):
        return "%s %s" % (
            str(self.era),
            str(self.name)
        )


class qpWarframeRelicReward(models.Model):
    relic = models.ForeignKey(
        qpRelic,
        on_delete=models.CASCADE,
        related_name="warframe_rewards",
        verbose_name=_("Relic"),
        blank=False,
        null=False
    )
    component = models.ForeignKey(
        qpWarframeComponent,
        on_delete=models.CASCADE,
        related_name="rewards",
        verbose_name=_("Warframe Component"),
        blank=False,
        null=False
    )
    percent = models.FloatField(
        verbose_name=_("Drop Chance"),
        default=0,
        blank=False,
        null=False
    )

    class Meta:
        verbose_name = _("Warframe Relic Reward")
        verbose_name_plural = _("Warframe Relic Rewards")
        ordering = ["component", "-percent"]
    
    def __str__(self):
        return "%s %s - %s" % (
            str(self.relic.era),
            str(self.relic.name),
            str(self.component)
        )


