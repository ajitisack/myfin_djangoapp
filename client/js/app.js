

var app = angular.module('myApp', ['ngRoute', 'ngResource', 'chart.js']);
var url = "http://127.0.0.1:8000/expenses/:id";
//var base_url = "http://127.0.0.1:8000/"

app.config(function ($routeProvider) {
    $routeProvider
    .when("/expense", {
        templateUrl : "templates/expense/expense.html"
    });
});


// factory method for REST API services: GET, POST, PUT, DELETE
app.factory('HTTPFactory',function($resource){
    return function(model){
        //url = base_url + model + "/:id"
        var url = "http://127.0.0.1:8000/expenses/:id"
        return $resource(url, {}, { update: { method: 'PUT' } });
    }
});


app.service('AppService', function () {
    // function to get values of an attribute from arroy json objects
    this.getValues = function getValues(inArr, field){
        return inArr.map(function(e) { return e[field] });
    }
    // group by sum function on an arroy json objects
    this.groupBySum = function groupBySum(inputArray, groupby_col, sum_col) {
        inArr = JSON.parse(JSON.stringify(inputArray));
        opArr = [];
        inArr.forEach(function(item) {
            var existing = opArr.find(function(each) { return each[groupby_col] == item[groupby_col] });
            if (existing) {
                existing[sum_col] = parseFloat(existing[sum_col]) + parseFloat(item[sum_col]);
            } else {
                opArr.push(item);
            }
        });
        return opArr;
    }
    // notify alert function
    this.notifyAlert = function notifyAlert(type, message){
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
});
