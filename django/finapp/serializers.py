
from rest_framework import serializers
from .models import Expense

class ExpenseSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Expense
        fields = ('id', 'category', 'amount', 'currency', 'date', 'description')

class ExpenseSerializerGroup(serializers.HyperlinkedModelSerializer):
    totalamount = serializers.IntegerField()
    class Meta:
        model = Expense
        fields = ('category', 'totalamount')
