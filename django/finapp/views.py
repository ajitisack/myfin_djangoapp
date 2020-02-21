from rest_framework import viewsets
from .serializers import ExpenseSerializer, ExpenseSerializerGroup
from .models import Expense
from django.db.models import Sum

class ExpenseViewSet(viewsets.ModelViewSet):
    queryset = Expense.objects.all()
    serializer_class = ExpenseSerializer

class ExpenseGroupViewSet(viewsets.ModelViewSet):
    queryset = Expense.objects.all()
    serializer_class = ExpenseSerializerGroup

    def get_queryset(self):
            return Expense.objects.values('category').annotate(totalamount=Sum('amount'))
