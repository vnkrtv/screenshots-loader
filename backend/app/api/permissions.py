from rest_framework import permissions


class EditingForLecturerOnly(permissions.BasePermission):
    message = "Editing allowed only for users belong to 'lecturer' group"
    allowed_group = 'lecturer'

    def has_permission(self, request, view):
        if request.method == 'GET':
            return True
        return request.user.groups.filter(name=self.allowed_group)
