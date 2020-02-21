# Generated by Django 2.0.2 on 2018-02-19 15:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('finapp', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='expense',
            name='currency',
            field=models.CharField(default='MYR', max_length=3),
        ),
        migrations.AlterField(
            model_name='expense',
            name='date',
            field=models.DateField(auto_now_add=True),
        ),
    ]