from django.contrib.auth import get_user_model
from django.db import models
from django.utils.translation import gettext_lazy as _

from qp.warframe.models import qpWarframeComponent, qpPrimaryWeaponComponent


class qpUserWarframeComponent(models.Model):
    user = models.ForeignKey(
        get_user_model(),
        on_delete=models.CASCADE,
        related_name="warframe_components",
        verbose_name=_("User"),
        blank=False,
        null=False
    )
    component = models.ForeignKey(
        qpWarframeComponent,
        on_delete=models.CASCADE,
        related_name="user_components",
        verbose_name=_("Component"),
        blank=False,
        null=False
    )
    created_at = models.DateTimeField(
        verbose_name=_("Created at"),
        auto_now_add=True
    )
    updated_at = models.DateTimeField(
        verbose_name=_("Updated at"),
        auto_now=True
    )

    class Meta:
        verbose_name = _("Warframe Component")
        verbose_name_plural = _("Warframe Components")
        ordering = ["user", "component"]
    
    def __str__(self):
        return "%s - %s" % (
            str(self.user),
            str(self.component)
        )


class qpUserPrimaryWeaponComponent(models.Model):
    user = models.ForeignKey(
        get_user_model(),
        on_delete=models.CASCADE,
        related_name="primaryweapon_components",
        verbose_name=_("User"),
        blank=False,
        null=False
    )
    component = models.ForeignKey(
        qpPrimaryWeaponComponent,
        on_delete=models.CASCADE,
        related_name="user_components",
        verbose_name=_("Component"),
        blank=False,
        null=False
    )
    created_at = models.DateTimeField(
        verbose_name=_("Created at"),
        auto_now_add=True
    )
    updated_at = models.DateTimeField(
        verbose_name=_("Updated at"),
        auto_now=True
    )

    class Meta:
        verbose_name = _("Primary Weapon Component")
        verbose_name_plural = _("Primary Weapon Components")
        ordering = ["user", "component"]
    
    def __str__(self):
        return "%s - %s" % (
            str(self.user),
            str(self.component)
        )

