import json
import requests
from django.core.files.storage import get_storage_class
from django.http import HttpResponse
from django.shortcuts import render
from django.template.loader import get_template
from django.templatetags.static import static

from qp.settings import STATICFILES_STORAGE
from qp.warframe.models import qpWarframe, qpRelic, qpWarframeRelicReward


def index(request):
    relics = []
    r = requests.get("https://drops.warframestat.us/data/relics.json")
    result = json.loads(r.text)
    for r in result["relics"]:
        for w in r["rewards"]:
            # ===---
            w["itemName"] = w["itemName"].replace("Neuroptics Blueprint", "- Neuroptiques")
            w["itemName"] = w["itemName"].replace("Systems Blueprint", "- Systèmes")
            w["itemName"] = w["itemName"].replace("Chassis Blueprint", "- Châssis")
            # ===---
            w["itemName"] = w["itemName"].replace("Systems", "- Systèmes")
            w["itemName"] = w["itemName"].replace("Carapace", "- Carapace")
            w["itemName"] = w["itemName"].replace("Cerebrum", "- Cerveau")
            # ===---
            w["itemName"] = w["itemName"].replace("Barrel", "- Canon")
            w["itemName"] = w["itemName"].replace("Receiver", "- Culasse")
            w["itemName"] = w["itemName"].replace("Stock", "- Crosse")
            # ===---
            w["itemName"] = w["itemName"].replace("Head", "- Tête")
            w["itemName"] = w["itemName"].replace("Grip", "- Prise")
            w["itemName"] = w["itemName"].replace("Handle", "- Poignée")
            w["itemName"] = w["itemName"].replace("Gauntlet", "- Gantelet")
            w["itemName"] = w["itemName"].replace("String", "- Corde")
            w["itemName"] = w["itemName"].replace("Link", "- Lien")
            w["itemName"] = w["itemName"].replace("Blade", "- Lame")
            w["itemName"] = w["itemName"].replace("Guard", "- Garde")
            w["itemName"] = w["itemName"].replace("Hilt", "- Quillon")
            w["itemName"] = w["itemName"].replace("Boot", "- Botte")
            w["itemName"] = w["itemName"].replace("Ornament", "- Ornement")
            w["itemName"] = w["itemName"].replace("Upper Limb", "- Partie Supérieure")
            w["itemName"] = w["itemName"].replace("Lower Limb", "- Partie Inférieure")
            # ===---
            w["itemName"] = w["itemName"].replace("Blueprint", "- Schéma")
            if "Prime" in w["itemName"]:
                relics.append(r)
    context = {
        "relics": relics
    }
    return render(request, "index.html", context)


def warframes(request):
    warframes_list = qpWarframe.objects.all()
    context = {
        "warframes": warframes_list
    }
    return render(request, "warframes.html", context)

def toStaticHref(match):
    string = match.group(1).strip("/")
    string_path = static(string)
    return 'href="%s"' % (str(string_path))

def toStaticSrc(match):
    string = match.group(1).strip("/")
    string_path = static(string)
    return 'src="%s"' % (str(string_path))

def app(request):
    template = get_template("app.html")
    try:
        storage_class = get_storage_class(STATICFILES_STORAGE)
        template_name = static("index.html").replace("/static/", "")
        with storage_class().open(template_name) as f:
            template = str(f.read(), "utf-8")
    except Exception as e:
        print(e)
    return HttpResponse(template)
