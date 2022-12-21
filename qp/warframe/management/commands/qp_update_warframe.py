import json
import requests
from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model

from concurrent.futures import ThreadPoolExecutor, wait

from qp.settings import STATICFILES_STORAGE
from qp.warframe.models import (
    qpWarframe, qpWarframeComponent,
    qpPrimaryWeapon, qpPrimaryWeaponComponent,
    qpSecondaryWeapon,
    qpMeleeWeapon,
    qpRelic,
    qpWarframeRelicReward, qpPrimaryWeaponRelicReward
)


executor = ThreadPoolExecutor(max_workers=2)

User = get_user_model()

class Command(BaseCommand):
    help = "To update Warframe data."

    def handle(self, *args, **options):
        print("--- Start ``Update Warframe data`` --------------")
        # self.qp_update_warframes()
        self.qp_update_primaryweapons()
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
    
    def qp_update_primaryweapons(self):
        print("\n\n--- Start updating primary weapons --------------")
        weapons = []
        async_weapons = []
        req = requests.get("https://raw.githubusercontent.com/WFCD/warframe-items/master/data/json/Primary.json")
        results = json.loads(req.text)
        for result in results:
            if " Prime" in result["name"]:
                async_weapons.append(executor.submit(self.qp_return_primaryweapons, result))
        completed, pending = wait(async_weapons)
        weapons = [i.result() for i in completed]
        print("Primary Weapons : ", len(weapons))
        print("--- End updating primary weapons ----------------\n\n")

    def qp_return_primaryweapons(self, result):
        # ===--- weapon ---
        weapon, created = qpPrimaryWeapon.objects.get_or_create(
            name=str(result["name"])
        )
        weapon.image_name = str(result["imageName"])
        weapon.save()
        # ===---
        if created:
            print("\n\Primary Weapon created ........................", str(weapon))
        else:
            print("\n\Primary Weapon updated ........................", str(weapon))
        # ===---
        if "components" in result:
            for component in result["components"]:
                if not any(x == component["name"] for x in ["Blueprint", "Barrel", "Blade", "Grip", "Handle", "Lower Limb", "Receiver", "Stock", "String", "Upper Limb"]):
                    continue
                # ===--- weapon component
                weapon_component, created = qpPrimaryWeaponComponent.objects.get_or_create(
                    weapon=weapon,
                    name=str(component["name"]).lower().replace(" ", "")
                )
                # ===---
                if created:
                    print("Primary Weapon component created ..............", str(weapon_component))
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
                    reward, created = qpPrimaryWeaponRelicReward.objects.get_or_create(
                        relic=relic,
                        component=weapon_component
                    )
                    reward.percent = float(drop["chance"])
                    reward.save()
                    # ===---
                    if created:
                        print("Primary Weapon relic reward created ...........", str(reward))
                    else:
                        print("Primary Weapon relic reward updated ...........", str(reward))
                    # ===---
