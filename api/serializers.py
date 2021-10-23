from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import Article, Habit, Goal, GoalDay

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    articles_bookmarked = serializers.PrimaryKeyRelatedField(many=True, default=[], queryset=Article.objects.all())
    articles_liked = serializers.PrimaryKeyRelatedField(many=True, default=[], queryset=Article.objects.all())
    habits_owned = serializers.PrimaryKeyRelatedField(many=True, default=[], queryset=Habit.objects.all())

    class Meta:
        model = User
        fields = (
            'id',
            'username',
            'articles_bookmarked',
            'articles_liked',
            'habits_owned'
        )

class ArticleSerializer(serializers.ModelSerializer):
    habits = serializers.PrimaryKeyRelatedField(many=True, default=[], queryset=Habit.objects.all())

    class Meta:
        model = Article
        fields = (
            'id',
            'title',
            'content',
            'datetime_created',
            'users_liked',
            'habits'
        )

class HabitSerializer(serializers.ModelSerializer):
    goals = serializers.PrimaryKeyRelatedField(many=True, default=[], queryset=Goal.objects.all())

    class Meta:
        model = Habit
        fields = (
            'id',
            'title',
            'description',
            'amount_saved_per_day',
            'goals',
        )

class GoalSerializer(serializers.ModelSerializer):
    goal_days = serializers.PrimaryKeyRelatedField(many=True, default=[], queryset=GoalDay.objects.all())

    class Meta:
        model = Goal
        fields = ('id', 'habit', 'date_start', 'date_end', 'goal_days')

class GoalDaySerializer(serializers.ModelSerializer):
    class Meta:
        model = GoalDay
        fields = ('id', 'goal', 'date')