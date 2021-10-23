from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, Habit, Article, Goal, GoalDay

admin.site.register(User, UserAdmin)
admin.site.register(Habit)
admin.site.register(Article)
admin.site.register(Goal)
admin.site.register(GoalDay)