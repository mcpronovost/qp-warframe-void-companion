from django import template

register = template.Library()

@register.simple_tag(takes_context=True)
def get_warframe_completion(context, warframe):
    try:
        request = context['request']
        if request.user.is_authenticated:
            result = 0
            total = warframe.components.count()
            for component in warframe.components.all():
                c = request.user.warframe_components.filter(
                    component=component
                ).first()
                if c is not None:
                    result += (100/total)
            if result > 100:
                result = 100
            return int(result)
        return 0
    except Exception as e:
        pass
    return 0
