from django.db import models

# Create your models here.
class ToDoApp(models.Model):
    title = models.CharField(max_length=150)
    description = models.TextField()

    def __str__(self):
        return self.title

# todo