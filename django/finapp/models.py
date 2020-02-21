from django.db import models
from datetime import date

class Expense(models.Model):
    category = models.CharField(max_length=50, blank = False)
    amount = models.DecimalField(max_digits=15, decimal_places=2)
    currency = models.CharField(max_length=3, default='MYR', blank = False)
    date = models.DateField(default=date.today)
    description = models.CharField(max_length=200, blank = False)
