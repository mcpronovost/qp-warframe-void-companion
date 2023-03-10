import json
import requests
from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model

from concurrent.futures import ThreadPoolExecutor, wait

from qp.settings import STATICFILES_STORAGE
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


executor = ThreadPoolExecutor(max_workers=2)

User = get_user_model()

class Command(BaseCommand):
    help = "To update Warframe data."

    def add_arguments(self, parser):
        parser.add_argument("--warframes", action="store_true", help="To update Warframes")
        parser.add_argument("--primaryweapons", action="store_true", help="To update Primary Weapons")
        parser.add_argument("--secondaryweapons", action="store_true", help="To update Secondary Weapons")
        parser.add_argument("--meleeweapons", action="store_true", help="To update Melee Weapons")

    def handle(self, *args, **options):
        print("--- Start ``Update Warframe data`` --------------")
        if options["warframes"]:
            self.qp_update_warframes()
        if options["primaryweapons"]:
            self.qp_update_weapons("Primary")
        if options["secondaryweapons"]:
            self.qp_update_weapons("Secondary")
        if options["meleeweapons"]:
            self.qp_update_weapons("Melee")
        print("--- End ``Update Warframe data`` ----------------")

    def qp_update_warframes(self):
        print("\n\n--- Start updating warframes --------------")
        warframes = []
        async_warframes = []
        req = requests.get("https://raw.githubusercontent.com/WFCD/warframe-items/master/data/json/Warframes.json")
        results = json.loads(req.text)
        for result in results:
            if "Prime" in result["name"] and result["name"] != "Excalibur Prime":
                async_warframes.append(executor.submit(self.qp_return_warframes, result))
        completed, pending = wait(async_warframes)
        warframes = [i.result() for i in completed]
        print("Warframes : ", len(warframes))
        print("--- End updating warframes ----------------\n\n")

    def qp_return_warframes(self, result):
        # ===--- warframe ---
        warframe, created = qpWarframe.objects.get_or_create(
            name=str(result["name"])
        )
        warframe.image_name = str(result["imageName"])
        warframe.save()
        # ===---
        if created:
            print("\n\nWarframe created ........................", str(warframe))
        else:
            print("\n\nWarframe updated ........................", str(warframe))
        # ===---
        if "components" in result:
            for component in result["components"]:
                if not any(x == component["name"] for x in ["Blueprint", "Chassis", "Systems", "Neuroptics"]):
                    continue
                # ===--- warframe component
                warframe_component, created = qpWarframeComponent.objects.get_or_create(
                    warframe=warframe,
                    name=str(component["name"]).lower()
                )
                # ===---
                if created:
                    print("Warframe component created ..............", str(warframe_component))
                # ===---
                for drop in component["drops"]:
                    if any(x in drop["location"] for x in ["(Flawless)", "(Exceptional)", "(Radiant)"]):
                        continue
                    d = drop["location"].split(" ")
                    # ===--- relic ---
                    relic, created = qpRelic.objects.get_or_create(
                        era=str(d[0]),
                        name=str(d[1])
                    )
                    # ===---
                    if created:
                        print("Relic created ...........................", str(relic))
                    # ===--- warframe relic reward ---
                    reward, created = qpWarframeRelicReward.objects.get_or_create(
                        relic=relic,
                        component=warframe_component
                    )
                    reward.percent = float(drop["chance"])
                    reward.save()
                    # ===---
                    if created:
                        print("Warframe relic reward created ...........", str(reward))
                    else:
                        print("Warframe relic reward updated ...........", str(reward))
                    # ===---
        return warframe
    
    def qp_update_weapons(self, weapontype):
        print("\n\n--- Start updating weapons --------------")
        weapons = []
        async_weapons = []
        req = requests.get(f"https://raw.githubusercontent.com/WFCD/warframe-items/master/data/json/{weapontype}.json")
        results = json.loads(req.text)
        for result in results:
            if " Prime" in result["name"] and result["name"] != "Lato Prime":
                async_weapons.append(executor.submit(self.qp_return_weapons, result, weapontype))
        completed, pending = wait(async_weapons)
        weapons = [i.result() for i in completed]
        print("Weapons : ", len(weapons))
        print("--- End updating weapons ----------------\n\n")

    def qp_return_weapons(self, result, weapontype):
        # ===--- weapon ---
        if weapontype == "Primary":
            weapon, created = qpPrimaryWeapon.objects.get_or_create(
                name=str(result["name"])
            )
        elif weapontype == "Secondary":
            weapon, created = qpSecondaryWeapon.objects.get_or_create(
                name=str(result["name"])
            )
        elif weapontype == "Melee":
            weapon, created = qpMeleeWeapon.objects.get_or_create(
                name=str(result["name"])
            )
        weapon.image_name = str(result["imageName"])
        weapon.save()
        # ===---
        if created:
            print("\n\n", weapontype, " Weapon created ........................", str(weapon))
        else:
            print("\n\n", weapontype, " Weapon updated ........................", str(weapon))
        # ===---
        if "components" in result:
            for component in result["components"]:
                if not any(x == component["name"] for x in [
                    "Blueprint",
                    "Barrel",
                    "Blade",
                    "Blades",
                    "Chain",
                    "Gauntlet",
                    "Grip",
                    "Guard",
                    "Handle",
                    "Head",
                    "Hilt",
                    "Link",
                    "Lower Limb",
                    "Ornament",
                    "Pouch",
                    "Receiver",
                    "Stars",
                    "Stock",
                    "String",
                    "Upper Limb"
                ]):
                    print(">>>>>>>>>>>>> ", component["name"])
                    continue
                # ===--- weapon component
                quantity = int(component["itemCount"])
                for i in range(quantity):
                    component_name = str(component["name"]).lower().replace(" ", "")
                    # ===---
                    if weapontype == "Primary":
                        weapon_component, created = qpPrimaryWeaponComponent.objects.get_or_create(
                            weapon=weapon,
                            name=component_name,
                            quantity_count=int(i+1)
                        )
                    elif weapontype == "Secondary":
                        weapon_component, created = qpSecondaryWeaponComponent.objects.get_or_create(
                            weapon=weapon,
                            name=component_name,
                            quantity_count=int(i+1)
                        )
                    elif weapontype == "Melee":
                        weapon_component, created = qpMeleeWeaponComponent.objects.get_or_create(
                            weapon=weapon,
                            name=component_name,
                            quantity_count=int(i+1)
                        )
                    # ===---
                    weapon_component.quantity = int(component["itemCount"])
                    weapon_component.save()
                    # ===---
                    if created:
                        print(weapontype, " Weapon component created ..............", str(weapon_component))
                    else:
                        print(weapontype, " Weapon component updated ..............", str(weapon_component))
                    # ===---
                    for drop in component["drops"]:
                        if any(x in drop["location"] for x in ["(Flawless)", "(Exceptional)", "(Radiant)"]):
                            continue
                        d = drop["location"].split(" ")
                        # ===--- relic ---
                        relic, created = qpRelic.objects.get_or_create(
                            era=str(d[0]),
                            name=str(d[1])
                        )
                        # ===---
                        if created:
                            print("Relic created ...........................", str(relic))
                        # ===--- weapon relic reward ---
                        if weapontype == "Primary":
                            reward, created = qpPrimaryWeaponRelicReward.objects.get_or_create(
                                relic=relic,
                                component=weapon_component
                            )
                        elif weapontype == "Secondary":
                            reward, created = qpSecondaryWeaponRelicReward.objects.get_or_create(
                                relic=relic,
                                component=weapon_component
                            )
                        elif weapontype == "Melee":
                            reward, created = qpMeleeWeaponRelicReward.objects.get_or_create(
                                relic=relic,
                                component=weapon_component
                            )
                        reward.percent = float(drop["chance"])
                        reward.save()
                        # ===---
                        if created:
                            print(weapontype, " Weapon relic reward created ...........", str(reward))
                        else:
                            print(weapontype, " Weapon relic reward updated ...........", str(reward))
                        # ===---
        return weapon
