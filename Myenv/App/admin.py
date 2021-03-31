from django.contrib import admin
from .models import *
# Register your models here.
@admin.register(ToDoApp)
class ToDoAppAdmin(admin.ModelAdmin):
    list_display=['title','id','description']