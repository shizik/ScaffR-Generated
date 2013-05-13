'use strict';

Application.Controllers.controller('index', ['$scope', 'employees', 'employee', 'employeeUtils', 'tasks', 'templates', 'departments', 'teams', 'assignables', function ($scope, employees, employee, employeeUtils, tasks, templates, departments, teams, assignables) {

    $scope.display = 'tiles';

    $scope.filter = {
        status: [],
        assignedTo: [],
        team: [],
        department: []
    };

    $scope.goToDetails = function (person) {
        // TODO: Should use the location service
        window.location.href = '/employee/index/' + person.id;
    };

    employee.summary(function (data) {
        $scope.employees = data.employees;
        $scope.assignables = data.assignables;
        $scope.departments = data.departments;
        $scope.summary = data.summary;
        $scope.teams = getTeamSummary(data.assignables);

        _.forEach($scope.employees, function (person) {
            person.counts = employeeUtils.getCounts(person);

            person.latestDueDate = function () {
                var due = undefined;

                _.forEach(person.tasks, function (task) {
                    if (!due || task.due < due) due = task.due;
                });

                return due;
            };
        });
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