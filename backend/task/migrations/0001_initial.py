# Generated by Django 4.1.10 on 2023-08-08 10:25

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Task',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=120)),
                ('note', models.TextField(blank=True, null=True)),
                ('completed', models.BooleanField(default=False)),
            ],
        ),
    ]
