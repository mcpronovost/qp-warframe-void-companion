from rest_framework import pagination
from rest_framework.response import Response
from django.contrib.auth import get_user_model


User = get_user_model()

class qpPagination(pagination.PageNumberPagination):
    page_size = 48

    def get_page_size(self, request):
        query_limit = request.query_params.get("limit", None)
        if query_limit is not None:
            return query_limit
        return self.page_size

    def get_paginated_response(self, data):
        view = self.request.parser_context["view"]
        kwargs = self.request.parser_context["kwargs"]
        context = {
            "next": self.get_next_link(),
            "previous": self.get_previous_link(),
            "count": self.page.paginator.count,
            "size": self.page.paginator.per_page,
            "results": data
        }
        if "slug" in kwargs and hasattr(view, "page_type") and getattr(view, "page_type") == "users":
            user = User.objects.filter(
                profile__slug=str(kwargs["slug"])
            ).first()
            if user is not None:
                context["user"] = str(user.profile.name)
        return Response(context)
