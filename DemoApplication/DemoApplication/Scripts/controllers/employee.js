'use strict';

Application.Controllers.controller('index', ['$scope', 'employee', function ($scope, employee) {

    $scope.person = { tasks: [] };

    employee.individual(function (data) {
        $scope.person = data;
        $scope.tasks = groupItems(data.tasks);
        $scope.availableTasks = groupItems(data.availableTasks);
        $scope.assignables = groupItems(data.assignables, 'department');
        $scope.templates = data.templates;

        var newTasks = {};
        _.forEach($scope.tasks.categories, function (item) {
            newTasks[item] = [];
        });

        $scope.newTasks = newTasks;
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
    // Add new task

    $scope.isAddingTask = false;

    $scope.addNewTask = function (category) {
        $scope.isAddingTask = true;

        $scope.newTasks[category].push(
            {
                "name": null,
                "category": category,
                "assignee": null,
                "due": null,
                "status": "open",
                "isDone": false
            });
    };

    $scope.saveTask = function (task) {
        $scope.tasks.group[task.category].push(task);
        $scope.deleteTask(task);
    };

    $scope.deleteTask = function (task) {
        var category = task.category;
        var index = $scope.newTasks[category].indexOf(task);

        $scope.newTasks[category].splice(index, 1);

        $scope.isAddingTask = false;
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