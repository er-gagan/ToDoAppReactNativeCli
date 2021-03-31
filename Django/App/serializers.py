from rest_framework import serializers
from .models import *

class ToDoAppSerializer(serializers.ModelSerializer):
    class Meta:
        model = ToDoApp
        fields = ['id','title','description']