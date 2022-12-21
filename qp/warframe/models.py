from django.db import models
from django.utils.translation import gettext_lazy as _

CHOIX_WEAPON_COMPONENTS = [
    ("blueprint", _("Blueprint")),
    ("barrel", _("Barrel")),
    ("blade", _("Blade")),
    ("grip", _("Grip")),
    ("handle", _("Handle")),
    ("link", _("Link")),
    ("lowerlimb", _("Lower Limb")),
    ("pouch", _("Pouch")),
    ("receiver", _("Receiver")),
    ("stars", _("Stars")),
    ("stock", _("Stock")),
    ("string", _("String")),
    ("upperlimb", _("Upper Limb"))
]


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
    quantity = models.PositiveSmallIntegerField(
        verbose_name=_("Quantity"),
        default=1,
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
            str(self.get_name_display())
        )


class qpPrimaryWeapon(models.Model):
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
        verbose_name = _("Primary Weapon")
        verbose_name_plural = _("Primary Weapons")
        ordering = ["name"]
    
    def __str__(self):
        return "%s" % (
            str(self.name)
        )


class qpPrimaryWeaponComponent(models.Model):
    weapon = models.ForeignKey(
        qpPrimaryWeapon,
        on_delete=models.CASCADE,
        related_name="components",
        verbose_name=_("Weapon"),
        blank=False,
        null=False
    )
    name = models.CharField(
        verbose_name=_("Name"),
        max_length=32,
        choices=CHOIX_WEAPON_COMPONENTS,
        blank=False,
        null=False
    )
    quantity = models.PositiveSmallIntegerField(
        verbose_name=_("Quantity"),
        default=1,
        blank=False,
        null=False
    )

    class Meta:
        verbose_name = _("Primary Weapon Component")
        verbose_name_plural = _("Primary Weapon Components")
        ordering = ["weapon", "name"]
    
    def __str__(self):
        return "%s - %s" % (
            str(self.weapon.name),
            str(self.get_name_display())
        )


class qpSecondaryWeapon(models.Model):
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
        verbose_name = _("Secondary Weapon")
        verbose_name_plural = _("Secondary Weapons")
        ordering = ["name"]
    
    def __str__(self):
        return "%s" % (
            str(self.name)
        )


class qpSecondaryWeaponComponent(models.Model):
    weapon = models.ForeignKey(
        qpSecondaryWeapon,
        on_delete=models.CASCADE,
        related_name="components",
        verbose_name=_("Weapon"),
        blank=False,
        null=False
    )
    name = models.CharField(
        verbose_name=_("Name"),
        max_length=32,
        choices=CHOIX_WEAPON_COMPONENTS,
        blank=False,
        null=False
    )
    quantity = models.PositiveSmallIntegerField(
        verbose_name=_("Quantity"),
        default=1,
        blank=False,
        null=False
    )

    class Meta:
        verbose_name = _("Secondary Weapon Component")
        verbose_name_plural = _("Secondary Weapon Components")
        ordering = ["weapon", "name"]
    
    def __str__(self):
        return "%s - %s" % (
            str(self.weapon.name),
            str(self.get_name_display())
        )


class qpMeleeWeapon(models.Model):
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
        verbose_name = _("Melee Weapon")
        verbose_name_plural = _("Melee Weapons")
        ordering = ["name"]
    
    def __str__(self):
        return "%s" % (
            str(self.name)
        )


class qpMeleeWeaponComponent(models.Model):
    weapon = models.ForeignKey(
        qpMeleeWeapon,
        on_delete=models.CASCADE,
        related_name="components",
        verbose_name=_("Weapon"),
        blank=False,
        null=False
    )
    name = models.CharField(
        verbose_name=_("Name"),
        max_length=32,
        choices=CHOIX_WEAPON_COMPONENTS,
        blank=False,
        null=False
    )
    quantity = models.PositiveSmallIntegerField(
        verbose_name=_("Quantity"),
        default=1,
        blank=False,
        null=False
    )

    class Meta:
        verbose_name = _("Melee Weapon Component")
        verbose_name_plural = _("Melee Weapon Components")
        ordering = ["weapon", "name"]
    
    def __str__(self):
        return "%s - %s" % (
            str(self.weapon.name),
            str(self.get_name_display())
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


class qpPrimaryWeaponRelicReward(models.Model):
    relic = models.ForeignKey(
        qpRelic,
        on_delete=models.CASCADE,
        related_name="primaryweapon_rewards",
        verbose_name=_("Relic"),
        blank=False,
        null=False
    )
    component = models.ForeignKey(
        qpPrimaryWeaponComponent,
        on_delete=models.CASCADE,
        related_name="rewards",
        verbose_name=_("Primary Weapon Component"),
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
        verbose_name = _("Primary Weapon Relic Reward")
        verbose_name_plural = _("Primary Weapon Relic Rewards")
        ordering = ["component", "-percent"]
    
    def __str__(self):
        return "%s %s - %s" % (
            str(self.relic.era),
            str(self.relic.name),
            str(self.component)
        )


class qpSecondaryWeaponRelicReward(models.Model):
    relic = models.ForeignKey(
        qpRelic,
        on_delete=models.CASCADE,
        related_name="secondaryweapon_rewards",
        verbose_name=_("Relic"),
        blank=False,
        null=False
    )
    component = models.ForeignKey(
        qpSecondaryWeaponComponent,
        on_delete=models.CASCADE,
        related_name="rewards",
        verbose_name=_("Secondary Weapon Component"),
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
        verbose_name = _("Secondary Weapon Relic Reward")
        verbose_name_plural = _("Secondary Weapon Relic Rewards")
        ordering = ["component", "-percent"]
    
    def __str__(self):
        return "%s %s - %s" % (
            str(self.relic.era),
            str(self.relic.name),
            str(self.component)
        )


class qpMeleeWeaponRelicReward(models.Model):
    relic = models.ForeignKey(
        qpRelic,
        on_delete=models.CASCADE,
        related_name="meleeweapon_rewards",
        verbose_name=_("Relic"),
        blank=False,
        null=False
    )
    component = models.ForeignKey(
        qpMeleeWeaponComponent,
        on_delete=models.CASCADE,
        related_name="rewards",
        verbose_name=_("Melee Weapon Component"),
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
        verbose_name = _("Melee Weapon Relic Reward")
        verbose_name_plural = _("Melee Weapon Relic Rewards")
        ordering = ["component", "-percent"]
    
    def __str__(self):
        return "%s %s - %s" % (
            str(self.relic.era),
            str(self.relic.name),
            str(self.component)
        )
