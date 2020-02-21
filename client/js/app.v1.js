
var app = angular.module('myApp', ['ngResource']);
var url = "http://127.0.0.1:8000/expenses/:id"

app.controller('myCtrl', function($scope, $filter, ExpenseFactory) {
    $scope.title = "New"
    $scope.date = $filter("date")(Date.now(), "yyyy-MM-dd");

    $scope.expenses = ExpenseFactory.query();

    $scope.updateExpense = function(expense){
        expense.date = $filter('date')(expense.date, "yyyy-MM-dd")
        expense.amount = Number(expense.amount).toFixed(2)

        $scope.expense = {};
        $('#expenseModal').modal('hide');

        if (expense.id == null) {
            ExpenseFactory.save(expense);
            $scope.expenses.push(expense);
        }
        else {
            ExpenseFactory.update({id: expense.id}, expense);
            index = $scope.expenses.findIndex(function(item, i){ return item.id == expense.id });
            $scope.expenses[index] = expense;
        }
    }

    $scope.deleteExpense = function(expense){
        ExpenseFactory.delete({'id':expense.id});
        index = $scope.expenses.indexOf(expense)
        $scope.expenses.splice(index, 1)
    }

    $scope.loadExpenseForm = function(expense){
        $scope.title = "Edit"
        $scope.expense = angular.copy(expense)
        $scope.expense.date = new Date(expense.date);
        $('#expenseModal').modal('show')
    }
});

app.factory('ExpenseFactory',function($resource){
    return $resource(url, {}, { update: { method: 'PUT' } });
});
