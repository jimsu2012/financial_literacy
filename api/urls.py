from django.contrib import admin
from django.urls import path, include
from .views import get_by_username, UserView, ArticleList, ArticleView

urlpatterns = [
    path('retrieve_user_by_username/', get_by_username),
    path('users/<str:pk>/', UserView.as_view()),
    path('articles/', ArticleList.as_view()),
    path('articles/<str:pk>/', ArticleView.as_view()),
]