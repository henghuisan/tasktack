from django.shortcuts import render
from rest_framework import viewsets
from .serializers import TaskSerializer
from .models import Task

from datetime import datetime

from django.http import HttpResponse

# Create your views here.

class TaskView(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    queryset = Task.objects.all()
    

def index(request):
    now = datetime.now()
    html = f'''
    <html>
        <body>
            <h1>Hello from Vercel!</h1>
            <p>The current time is { now }.</p>
        </body>
    </html>
    '''
    return HttpResponse(html)