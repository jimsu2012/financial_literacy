from django.contrib import admin
from django.urls import path, include
from .views import (
    get_by_username,
    UserView,
    ArticleList,
    ArticleView,
    HabitList,
    HabitView,
    GoalList,
    GoalView,
    GoalDayList,
    GoalDayView
)

urlpatterns = [
    path('retrieve_user_by_username/', get_by_username),
    path('users/<str:pk>/', UserView.as_view()),
    path('articles/', ArticleList.as_view()),
    path('articles/<str:pk>/', ArticleView.as_view()),
    path('habits/', HabitList.as_view()),
    path('habits/<str:pk>/', HabitView.as_view()),
    path('goals/', GoalList.as_view()),
    path('goals/<str:pk>/', GoalView.as_view()),
    path('goal_days/', GoalDayList.as_view()),
    path('goal_days/<str:pk>/', GoalDayView.as_view()),
]