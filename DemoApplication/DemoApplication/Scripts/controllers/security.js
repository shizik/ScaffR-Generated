/// <reference path="../lib/underscore/underscore-1.4.2.js" />
'use strict';

Application.Controllers.controller('index', ['$scope', 'employees', 'employee', 'tasks', 'templates', 'departments', 'teams', 'assignables', function ($scope, employees, employee, tasks, templates, departments, teams, assignables) {

    $scope.display = 'tiles';

    $scope.sort = 'za';

    $scope.filter = {
        status: [],
        assignedTo: [],
        team: [],
        department: [],
        alpha: true
    };

    $scope.status;

    $scope.statusFilter = function (item) {
        if (!$scope.status) return true;

        return item[$scope.status].length > 0;
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


    $scope.changeFilter = function (status) {

        $scope.status = status;

        //if (_.contains($scope.filter.status, status)) {
        //    $scope.filter.status = _.without($scope.filter.status, status);
        //} else {
        //    $scope.filter.status.push(status);
        //}
        //console.log($scope.filter.status);
    };

    $scope.containsStatus = function (status) {
        return _.contains($scope.filter.status, status);
    };

    $scope.changeDisplay = function (mode) {
        $scope.display = mode;
    };

    $scope.changeSort = function (sort) {
        $scope.sort = sort;
    };

    $scope.getSortLabel = function (sort) {
        switch (sort) {
            case 'az':
                return 'Sort A-Z';
            case 'za':
                return 'Sort Z-A';
            default:
                return '';
        }
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