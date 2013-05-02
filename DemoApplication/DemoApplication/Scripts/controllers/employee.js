'use strict';

Application.Controllers.controller('index', ['$scope', 'employee', function ($scope, employee) {

    $scope.person = { tasks: [] };

    employee.individual(function (data) {
        $scope.person = data;
        $scope.tasks = groupItems(data.tasks);
        $scope.availableTasks = groupItems(data.availableTasks);
        $scope.assignables = groupItems(data.assignables, 'department');
    });

    function groupItems(taskList, group) {
        group = group || 'category';

        var result = {
            categories: [],
            group: {}
        };

        _.forEach(taskList, function (item) {

            if (!result.group[item[group]]) {
                result.group[item[group]] = [];
                result.categories.push(item[group]);
            }

            result.group[item[group]].push(item);
        });

        return result;
    }

    //
    // General Data Editing

    var personCopy = {};
    $scope.editMode = false;

    $scope.changeMode = function () {
        if (!$scope.editMode) {
            angular.copy($scope.person, personCopy);
        } else {
            $scope.person.name = personCopy.name;
            $scope.person.title = personCopy.title;
            $scope.person.email = personCopy.email;
            $scope.person.credentials = personCopy.credentials;
        }

        $scope.editMode = !$scope.editMode;
    };

    $scope.saveGeneralData = function () {
        // TODO: Add logic for saving data to server

        $scope.editMode = false;
    };

    //
    // Paging

    $scope.activeCategory = undefined;
    $scope.pagedMode = false;
    $scope.currentPage = 0;
    $scope.pageSize = 0;
    $scope.briefPageSize = 20;

    $scope.changePagedMode = function (category) {
        $scope.activeCategory = category;
        $scope.pagedMode = !$scope.pagedMode;
    };

    //
    // Add new task

    $scope.addNewTask = function (category) {
        $scope.tasks.group[category].push(
            {
                "name": null,
                "category": category,
                "assignee": null,
                "due": null,
                "status": "open",
                "isDone": false
            });
    };

    $scope.deleteTask = function (task) {
        var category = task.category;
        var index = $scope.tasks.group[category].indexOf(task);

        $scope.tasks.group[category].splice(index, 1);
    };

    //
    // Individual task view

    $scope.listView = true;
    $scope.activeTask = undefined;

    $scope.showTask = function (task) {
        $scope.activeTask = task;
        $scope.listView = false;
    };

    $scope.backToList = function () {
        $scope.activeTask = undefined;
        $scope.listView = true;
    };

}]);