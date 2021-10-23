from django.urls import re_path, include
from .views import index_view

urlpatterns = [
    re_path(r'^.*$', index_view)
]