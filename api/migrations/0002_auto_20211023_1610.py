# Generated by Django 3.2.8 on 2021-10-23 16:10

from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Goal',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('date_start', models.DateField()),
                ('date_end', models.DateField()),
            ],
        ),
        migrations.CreateModel(
            name='Habit',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=100)),
                ('description', models.TextField(blank=True)),
                ('amount_saved_per_day', models.DecimalField(blank=True, decimal_places=2, max_digits=7)),
            ],
        ),
        migrations.CreateModel(
            name='HabitMet',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('date', models.DateField()),
                ('goal', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.goal')),
            ],
        ),
        migrations.AddField(
            model_name='goal',
            name='habit',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.habit'),
        ),
        migrations.AddField(
            model_name='article',
            name='habits',
            field=models.ManyToManyField(to='api.Habit'),
        ),
    ]
