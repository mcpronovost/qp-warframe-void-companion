from rest_framework.permissions import BasePermission


class qpIsAny(BasePermission):
    """
    Allows access to everyone.
    """

    def has_permission(self, request, view):
        return bool(True)


class qpIsAuthenticated(BasePermission):
    """
    Allows access only to authenticated users with profile.
    """

    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and request.user.profile)
