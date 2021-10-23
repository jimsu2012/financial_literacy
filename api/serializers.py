from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import Article, Habit, Goal, GoalDay

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    articles_bookmarked = serializers.PrimaryKeyRelatedField(many=True, queryset=Article.objects.all())
    articles_liked = serializers.PrimaryKeyRelatedField(many=True, queryset=Article.objects.all())

    class Meta:
        model = User
        fields = ('id', 'username', 'articles_bookmarked', 'articles_liked')

class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = ('id', 'title', 'content', 'datetime_created', 'users_liked')

class HabitSerializer(serializers.ModelSerializer):
    class Meta:
        model = Habit
        fields = ('id', 'title', 'description', 'amount_saved_per_day')

class GoalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Goal
        fields = ('id', 'habit', 'date_start', 'date_end')

class GoalDaySerializer(serializers.ModelSerializer):
    class Meta:
        model = GoalDay
        fields = ('id', 'goal', 'date')