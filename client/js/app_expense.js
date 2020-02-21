
// function to define controllers for Expense
app.controller('ExpenseCtrl', function($scope, $filter, HTTPFactory, AppService) {

    // function to watch changes in expenses array and redraw the chart
    $scope.$watch('expenses', function (newValue, oldValue, scope) {
        summary = AppService.groupBySum($scope.expenses, "category", "amount")
        $scope.labels = AppService.getValues(summary, "category")
        $scope.data = AppService.getValues(summary, "amount")
    }, true);

    HTTPFactory("expenses").query().$promise.then(function(result){
        $scope.expenses = result
    });

    // function to create and update expense
    $scope.updateExpense = function(expense){
        // set date in yyyy-MM-dd format
        expense.date = $filter('date')(expense.date, "yyyy-MM-dd")
        expense.amount = Number(expense.amount).toFixed(2)
        $('#expenseModal').modal('hide');

        // create new expense
        if ($scope.title == "New") {
            HTTPFactory("expenses").save(expense, function(success){
                    success.$promise.then(function(result){
                        $scope.expenses.push(result);
                    });
                    AppService.notifyAlert("success", "Hi, you have added a new expense!");
            }, function (error) {
                    AppService.notifyAlert("danger", error.status + "! There is an error while updating " + expense.description + "!");
            });
        }

        // update an expense
        if ($scope.title == "Edit") {
            HTTPFactory("expenses").update({id: expense.id}, expense, function(success){
                    index = $scope.expenses.findIndex(function(item, i){ return item.id == expense.id });
                    $scope.expenses[index] = expense;
                    AppService.notifyAlert("success", "Hi, you have modified expense!");
            }, function(error) {
                    console.log(error)
                    AppService.notifyAlert("danger", error.status + "! There is an error while updating " + expense.description + "!");
            });
        }
    }

    // function to delete an expense
    $scope.deleteExpense = function(expense){
        HTTPFactory("expenses").delete({'id':expense.id}, function(success){
                index = $scope.expenses.indexOf(expense)
                $scope.expenses.splice(index, 1)
                AppService.notifyAlert("success", "Hi, you have deleted expense " + expense.description + "!");
        }, function(error) {
                console.log(error)
                AppService.notifyAlert("danger", error.status + "! There is an error while deleting " + expense.description + "!");
        });
    }

    // function to prepare new expense form
    $scope.newExpenseForm = function(){
        $scope.title = "New"
        today = new Date().toISOString().slice(0,10)
        $scope.expense = { date : new Date(today), category : "General", currency : "MYR", amount : 1.00}
        $('#expenseModal').modal('show')
    }

    // function to load expense form with values of the choosen expense
    $scope.loadExpenseForm = function(expense){
        $scope.title = "Edit"
        $scope.expense = angular.copy(expense)
        $scope.expense.date = new Date(expense.date);
        $scope.expense.amount = parseFloat(expense.amount)
        $('#expenseModal').modal('show')
    }
});
