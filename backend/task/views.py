from rest_framework_mongoengine.viewsets import ModelViewSet
from rest_framework.response import Response
from .serializers import TaskSerializer
from .models import Task
from datetime import datetime
from django.http import HttpResponse


class TaskViewSet(ModelViewSet):
    lookup_field = "id"
    serializer_class = TaskSerializer
    queryset = Task.objects.all()

    # def update(self, request, *args, **kwargs):
    #     instance = self.get_object()  # Get the object being updated
    #     serializer = self.get_serializer(instance, data=request.data, partial=True)
    #     serializer.is_valid(raise_exception=True)
    #     serializer.update(instance, serializer.validated_data)  # Use the custom update function
    #     return Response(serializer.data)


def index(request):
    now = datetime.now()
    html = f"""
    <html>
        <body>
            <h1>Hello from Grace! Test static</h1>
            <p>The current time is { now }.</p>
        </body>
    </html>
    """
    return HttpResponse(html)
