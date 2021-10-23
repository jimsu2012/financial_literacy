from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import Article

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