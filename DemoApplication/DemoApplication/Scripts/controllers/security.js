/// <reference path="../lib/underscore/underscore-1.4.2.js" />
'use strict';

Application.Controllers.controller('index', ['$scope', 'employees', 'tasks', 'templates', 'departments', 'teams', function ($scope, employees, tasks, templates, departments, teams) {

    $scope.display = 'tiles';
    $scope.sort = 'za';
    $scope.filter = {
        field: '',
        value: ''
    };

    $scope.items = employees.getSummary();
    $scope.departments = departments.getAll();
    $scope.teams = teams.getSummary();

    $scope.changeDisplay = function (mode) {
        $scope.display = mode;
    };

    $scope.changeSort = function (sort) {
        $scope.sort = sort;
    };    

    $scope.changeFilter = function(field, value) {
        $scope.filter = {
            field: field,
            value: value
        };        
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