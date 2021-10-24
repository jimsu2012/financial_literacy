import uuid
from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

class Habit(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    owner = models.ForeignKey(User, related_name='habits_owned', on_delete=models.CASCADE, blank=True)
    title = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    amount_saved_per_day = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)

class ArticleGroup(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    owner = models.ForeignKey(User, related_name='article_groups_owned', on_delete=models.CASCADE, null=True, blank=True)
    title = models.CharField(max_length=100)
    image_url = models.URLField(max_length=200)

class Article(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    group = models.ForeignKey(ArticleGroup, related_name='articles', on_delete=models.CASCADE, null=True, blank=True)
    owner = models.ForeignKey(User, related_name='article', on_delete=models.CASCADE, blank=True)
    image_url = models.URLField(max_length=200, blank=True)
    title = models.CharField(max_length=100)
    content = models.TextField()
    datetime_created = models.DateTimeField(auto_now_add=True)
    users_bookmarked = models.ManyToManyField(User, related_name='articles_bookmarked', blank=True)
    users_liked = models.ManyToManyField(User, related_name='articles_liked', blank=True)
    habits = models.ManyToManyField(Habit, related_name='articles_contained_in', blank=True)

class Goal(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    habit = models.ForeignKey(Habit, related_name='goals', on_delete=models.CASCADE)
    date_start = models.DateField()
    date_end = models.DateField()

class GoalDay(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    goal = models.ForeignKey(Goal, related_name='goal_days', on_delete=models.CASCADE)
    date = models.DateField()