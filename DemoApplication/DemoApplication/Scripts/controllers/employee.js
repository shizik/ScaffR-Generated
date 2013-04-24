/// <reference path="../lib/underscore/underscore-1.4.2.js" />
'use strict';

Application.Controllers.controller('index', ['$scope', 'employee', function ($scope, employee) {

    employee.individual(function(data) {
        $scope.person = data;
    });

}]);