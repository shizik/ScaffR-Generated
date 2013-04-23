/// <reference path="../lib/underscore/underscore-1.4.2.js" />
/// <reference path="~/Scripts/lib/angular/angular.js" />
'use strict';

Application.Controllers.controller('index', ['$scope', 'employees', 'employee', 'tasks', 'templates', 'departments', 'teams', 'assignables', function ($scope, employees, employee, tasks, templates, departments, teams, assignables) {

    $scope.display = 'tiles';

    $scope.filter = {
        status: [],
        assignedTo: [],
        team: [],
        department: [],
        alpha: true
    };

    employee.summary(function (data) {
        $scope.employees = data.employees;
        $scope.assignables = data.assignables;
        $scope.departments = data.departments;
        $scope.summary = data.summary;
        $scope.teams = getTeamSummary(data.assignables);
    });

    function getTeamSummary(ass) {
        var summary = [];
        for (var i = 0; i < ass.length; i++) {
            var assignable = ass[i];
            if (assignable.type == 'team') {
                summary.push(assignable);
            }
        }
        return summary;
    }

    $scope.containsStatus = function (status) {
        return _.contains($scope.filter.status, status);
    };

    $scope.changeDisplay = function (mode) {
        $scope.display = mode;
    };

    $scope.open = function () {
        $scope.shouldBeOpen = true;
    };

    $scope.close = function () {
        $scope.closeMsg = 'I was closed at: ' + new Date();
        $scope.shouldBeOpen = false;
    };

    $scope.opts = {
        backdropFade: true,
        dialogFade: true
    };

}]);

$('.filter').click(function (e) {
    e.stopPropagation();
});