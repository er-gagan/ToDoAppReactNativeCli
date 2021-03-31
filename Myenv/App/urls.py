from django.urls import path
from .views import *

urlpatterns = [
    path('list',ToDoAppViews.as_view()),
]
