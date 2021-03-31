from django.db.models.query_utils import Q
from .models import *
from rest_framework import status
from rest_framework.views import APIView
from .serializers import *
from rest_framework.response import Response
# Create your views here.

class ToDoAppViews(APIView):
    def get(self, request, format=None):
        queryset = ToDoApp.objects.all()
        serializer = ToDoAppSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, format = None):
        try:
            title = request.data['title']
            description = request.data['description']
            todo = ToDoApp(title=title, description=description)
            todo.save()
            serializer = ToDoAppSerializer(todo)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except:
            return Response(serializer.errors, status=status.HTTP_406_NOT_ACCEPTABLE)

    def delete(self, request, format = None):
        Id = request.data['id']
        title = request.data['title']
        if ToDoApp.objects.filter(Q(id=Id)&Q(title=title)):
            ToDoApp.objects.filter(Q(id=Id)&Q(title=title)).delete()
            return Response(status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, format = None):
        Id = request.data['id']
        title = request.data['title']
        description = request.data['description']
        if ToDoApp.objects.filter(id=Id):
            ToDoApp.objects.filter(id=Id).update(title=title, description=description)
            return Response(status=status.HTTP_200_OK)
        return Response(status=status.HTTP_406_NOT_ACCEPTABLE)