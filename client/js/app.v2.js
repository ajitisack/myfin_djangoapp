
function getValues(inArr, field){
    var a = inArr.map(function(e) { return e[field] });
}

function groupBySum(inputArray, groupby_col, sum_col) {
    inArr = JSON.parse(JSON.stringify(inputArray));
    opArr = [];
    inArr.forEach(function(item) {
        var existing = opArr.find(function(each) { return each[groupby_col] == item[groupby_col]; });
        if (existing) {
            existing[sum_col] = parseFloat(existing[sum_col]) + parseFloat(item[sum_col]);
        } else {
            opArr.push(item);
        }
    });
    return opArr;
}


var app = angular.module('myApp', ['ngResource', 'chart.js']);
var url = "http://127.0.0.1:8000/expenses/:id"
var dateControl = document.querySelector('input[type="date"]');


// function to define controllers for Expense Factory
app.controller('myCtrl', function($scope, $filter, ExpenseFactory) {

    $scope.expenses = ExpenseFactory.query();

    //var response = ExpenseFactory.query();
    //var response = ExpenseFactory.query();
    var response = ExpenseFactory.query()
    var a = JSON.stringify(response);
    console.log(a);
    //console.log(a)

    // $scope.labels = getValues(response, "category")
    // $scope.data = getValues(response, "amount")

    // function to create and update expense
    $scope.updateExpense = function(expense){
        // set date in yyyy-MM-dd format
        expense.date = $filter('date')(expense.date, "yyyy-MM-dd")
        expense.amount = Number(expense.amount).toFixed(2)
        $('#expenseModal').modal('hide');

        // create new expense
        if ($scope.title == "New") {
            ExpenseFactory.save(expense);
            $scope.expenses.push(expense);
            notifyAlert("success", "Hi, you have added a new expense!");
        }

        // update an expense
        if ($scope.title == "Edit") {
            ExpenseFactory.update({id: expense.id}, expense);
            index = $scope.expenses.findIndex(function(item, i){ return item.id == expense.id });
            $scope.expenses[index] = expense;
            notifyAlert("success", "Hi, you have modified expense!");
        }
    }

    // function to delete an expense
    $scope.deleteExpense = function(expense){
        // delete expense using REST API
        ExpenseFactory.delete({'id':expense.id});
        // get the index of the expense item from JS array expenses
        index = $scope.expenses.indexOf(expense)
        // delete the expense from JS array using index
        $scope.expenses.splice(index, 1)
        // generate notify alert
        notifyAlert("danger", "Hi, you have deleted expense " + expense.description + "!");
    }

    // function to prepare new expense form
    $scope.newExpenseForm = function(){
        $scope.title = "New"
        today = new Date().toISOString().slice(0,10)
        $scope.expense = { date : new Date(today), category : "General", currency : "MYR", amount : "1.00"}
        $('#expenseModal').modal('show')
    }

    // function to load expense form with values of the choosen expense
    $scope.loadExpenseForm = function(expense){
        $scope.title = "Edit"
        $scope.expense = angular.copy(expense)
        $scope.expense.date = new Date(expense.date);
        $('#expenseModal').modal('show')
    }
});


// factory method for REST API services: GET, POST, PUT, DELETE
app.factory('ExpenseFactory',function($resource){
    return $resource(url, {}, { update: { method: 'PUT' } });
});


// notify alert function
function notifyAlert(type, message){
    $.notify({
    	message: message,
    },{
    	type: type,
        delay: 100,
    	placement: {
    		from: "top",
    		align: "right"
    	},
    	animate: {
    		enter: 'animated fadeInDown',
    		exit: 'animated fadeOutUp'
    	},
    });
}
