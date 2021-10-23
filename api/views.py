import json
from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.decorators import api_view
from .models import (
    Article,
    Habit,
    Goal,
    GoalDay
)
from .serializers import (
    UserSerializer,
    ArticleSerializer,
    HabitSerializer,
    GoalSerializer,
    GoalDaySerializer
)

User = get_user_model()

@api_view(('POST',))
def get_by_username(request):
    body_unicode = request.body.decode('utf-8')
    try:
        body = json.loads(body_unicode)
    except:
        return Response(data="Invalid JSON", status=status.HTTP_400_BAD_REQUEST)
    if not ('username' in body):
        return Response(data={'username': 'required'}, status=status.HTTP_400_BAD_REQUEST)
    username = body['username']
    user = get_object_or_404(User, username=username)
    return Response(UserSerializer(user).data, status=status.HTTP_200_OK)

class UserView(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (IsAuthenticated,)

class ArticleList(generics.ListCreateAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)

class ArticleView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)

class HabitList(generics.ListCreateAPIView):
    queryset = Habit.objects.all()
    serializer_class = HabitSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)

class HabitView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Habit.objects.all()
    serializer_class = HabitSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)

class GoalList(generics.ListCreateAPIView):
    queryset = Goal.objects.all()
    serializer_class = GoalSerializer
    permission_classes = (IsAuthenticated,)

class GoalView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Goal.objects.all()
    serializer_class = GoalSerializer
    permission_classes = (IsAuthenticated,)

class GoalDayList(generics.ListCreateAPIView):
    queryset = GoalDay.objects.all()
    serializer_class = GoalDaySerializer
    permission_classes = (IsAuthenticated,)

class GoalDayView(generics.RetrieveUpdateDestroyAPIView):
    queryset = GoalDay.objects.all()
    serializer_class = GoalDaySerializer
    permission_classes = (IsAuthenticated,)