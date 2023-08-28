from mongoengine import (
    Document,
    StringField,
    BooleanField,
    DateTimeField,
    EmbeddedDocumentListField,
    EmbeddedDocument,
)
from django.utils import timezone
from bson.objectid import ObjectId


class SubTask(EmbeddedDocument):
    title = StringField(null=True, blank=True)
    completed = BooleanField(default=False)
    created_at = DateTimeField(default=timezone.now)

class Task(Document):
    title = StringField(null=True, blank=True)
    note = StringField(null=True, blank=True)
    category = StringField(default="Inbox")
    priority = StringField(default="None")
    completed = BooleanField(default=False)
    due_date = DateTimeField(required=False, null=True)
    is_deleted = BooleanField(default=False)
    created_at = DateTimeField(default=timezone.now)
    subtasks = EmbeddedDocumentListField(SubTask)

    meta = {"ordering": ["-created_at"]}  # Optional: Order tasks by creation date


# Usage
# main_task = Task(title="8 Main Task", completed=False)
# main_task.subtasks.append(SubTask(id=ObjectId, title="Sub Task 1", completed=True))
# main_task.subtasks.append(SubTask(id=ObjectId, title="Sub Task 2", completed=False))
# main_task.save()

# retrieved_task = Task.objects.get(title="8 Main Task")
# print(retrieved_task.title)
# for subtask in retrieved_task.subtasks:
#     print(subtask.title)
#     for nested_subtask in subtask.subtasks:
#         print(nested_subtask.title)
