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
            'owner',
            'title',
            'content',
            'datetime_created',
            'users_liked',
            'habits'
        )
    
    def create(self, validated_data):
        request = self.context.get('request', None)
        owner = None
        if request:
            owner = request.user
        return Article.objects.create(
            title=validated_data.get('title'),
            content=validated_data.get('content', ''),
            owner=owner
        )

class HabitSerializer(serializers.ModelSerializer):
    goals = serializers.PrimaryKeyRelatedField(many=True, default=[], queryset=Goal.objects.all())

    class Meta:
        model = Habit
        fields = (
            'id',
            'owner',
            'title',
            'description',
            'amount_saved_per_day',
            'goals',
        )
    
    def create(self, validated_data):
        request = self.context.get('request', None)
        owner = None
        if request:
            owner = request.user
        return Habit.objects.create(
            title=validated_data.get('title'),
            description=validated_data.get('description', ''),
            amount_saved_per_day=validated_data.get('amount_saved_per_day'),
            owner=owner
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