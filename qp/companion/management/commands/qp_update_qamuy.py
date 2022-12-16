from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model

from qp.warframe.models import qpWarframe
from qp.companion.models import qpUserWarframeComponent


User = get_user_model()

class Command(BaseCommand):
    help = "To update Qamuy data."

    def handle(self, *args, **options):
        print("--- Start ``Update Qamuy data`` --------------")
        qamuy = User.objects.filter(username="qamuy").first()
        if qamuy is None:
            return
        for warframe in qpWarframe.objects.all():
            completed_ones = ["Ash Prime", "Atlas Prime", "Banshee Prime", "Chroma Prime", "Ember Prime", "Equinox Prime", "Frost Prime", "Gara Prime", "Garuda Prime", "Hydroid Prime", "Inaros Prime", "Ivara Prime", "Khora Prime", "Limbo Prime", "Loki Prime", "Mag Prime", "Mesa Prime", "Mirage Prime", "Nekros Prime", "Nidus Prime", "Nova Prime", "Nyx Prime", "Oberon Prime", "Octavia Prime", "Revenant Prime", "Rhino Prime", "Saryn Prime", "Titania Prime", "Trinity Prime", "Valkyr Prime", "Vauban Prime", "Volt Prime", "Wukong Prime", "Zephyr Prime"]
            if warframe.name in completed_ones:
                for component in warframe.components.all():
                    qpUserWarframeComponent.objects.get_or_create(
                        user=qamuy,
                        component=component
                    )
            elif warframe.name == "Baruuk Prime":
                component = warframe.components.filter(name="systems").first()
                qpUserWarframeComponent.objects.get_or_create(
                    user=qamuy,
                    component=component
                )
            elif warframe.name == "Harrow Prime":
                component = warframe.components.filter(name="blueprint").first()
                qpUserWarframeComponent.objects.get_or_create(
                    user=qamuy,
                    component=component
                )
                component = warframe.components.filter(name="neuroptics").first()
                qpUserWarframeComponent.objects.get_or_create(
                    user=qamuy,
                    component=component
                )
            elif warframe.name == "Nezha Prime":
                component = warframe.components.filter(name="blueprint").first()
                qpUserWarframeComponent.objects.get_or_create(
                    user=qamuy,
                    component=component
                )
        print("--- End ``Update Qamuy data`` ----------------")