from rest_framework import permissions

class IsOwnerOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method == 'POST':
            return request.user.is_authenticated

        return True

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True

        return obj.owner == request.user

class IsOwner(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated

    def has_object_permission(self, request, view, obj):
        return obj.owner == request.user

class IsOwnerUser(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated

    def has_object_permission(self, request, view, obj):
        return obj == request.user

class IsOwnerGoal(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated

    def has_object_permission(self, request, view, obj):
        return obj.habit.owner == request.user

class IsOwnerGoalDay(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated

    def has_object_permission(self, request, view, obj):
        return obj.goal.habit.owner == request.user