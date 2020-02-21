var app = angular.module('myApp', ['ngResource']);
var url = "http://127.0.0.1:8000/expenses/"

app.controller('myCtrl', function($scope, $http, ExpenseCRUDService) {
        $scope.getAllExpenses = function(){
            ExpenseCRUDService.getAllExpenses()
              .then(function (response){
                  $scope.expenses = response.data;
                  loadChart1(response)
            });
            ExpenseCRUDService.getExpensesbyCategory()
              .then(function (response){
                  loadChart1(response)
            });
        }
        $scope.addExpense = function(){
            ExpenseCRUDService.addExpense($scope.category, $scope.amount, $scope.currency, $scope.date, $scope.description)
            $('#expenseModal').modal('hide')
            $scope.expenseForm.$setPristine();
            $scope.getAllExpenses();
        }
        $scope.updateExpense = function(id, category, amount){
                $scope.category = category
                $scope.amount = amount
                ExpenseCRUDService.addExpense(id, $scope.category, $scope.amount)
        }
        $scope.deleteExpense = function(id){
            ExpenseCRUDService.deleteExpense(id)
            $scope.getAllExpenses();
        }
});

app.service('ExpenseCRUDService',['$http', function ($http) {
    this.getAllExpenses = function getAllExpenses(){
        return $http({
                method : 'GET',
                url    : url
        });
    }
    this.getExpensesbyCategory = function getExpensesbyCategory(){
        return $http({
                method : 'GET',
                url    : 'http://127.0.0.1:8000/expenses_group/'
        });
    }
    this.deleteExpense = function deleteExpense(id){
        return $http({
                method : 'DELETE',
                url    : url + id + '/'
        })
    }
    this.addExpense = function addExpense(category, amount, currency, date, description){
        return $http({
          method : 'POST',
          url    : url,
          data   : {category:category, amount:amount, currency:currency, date:date, description:description}
        });
    }
    this.updateExpense = function updateExpense(id,category,amount){
        return $http({
          method : 'PATCH',
          url    : url + id,
          data   : {category:category, amount:amount}
        })
    }
}]);
