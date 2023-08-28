from rest_framework_mongoengine.serializers import (
    DocumentSerializer,
    EmbeddedDocumentSerializer,
)
from .models import Task, SubTask

class SubTaskSerializer(EmbeddedDocumentSerializer):
    class Meta:
        model = SubTask
        fields = "__all__"

class TaskSerializer(DocumentSerializer):
    subtasks = SubTaskSerializer(many=True)

    class Meta:
        model = Task
        fields = "__all__"
    
    def create(self, validated_data):
        subtasks_data = validated_data.pop('subtasks')
        task = Task.objects.create(**validated_data)
        for subtask_data in subtasks_data:
            subtask = SubTask(**subtask_data)
            task.subtasks.append(subtask)
        task.save()
        return task

    def update(self, instance, validated_data):
        subtasks_data = validated_data.pop('subtasks', [])
        
        # Update the fields of the Task instance
        instance.title = validated_data.get('title', instance.title)
        instance.note = validated_data.get('note', instance.note)
        instance.category = validated_data.get('category', instance.category)
        instance.priority = validated_data.get('priority', instance.priority)
        instance.completed = validated_data.get('completed', instance.completed)
        instance.due_date = validated_data.get('due_date', instance.due_date)

        # Clear existing subtasks and add updated subtasks
        instance.subtasks.clear()
        for subtask_data in subtasks_data:
            instance.subtasks.append(SubTask(**subtask_data))

        instance.save()
        return instance