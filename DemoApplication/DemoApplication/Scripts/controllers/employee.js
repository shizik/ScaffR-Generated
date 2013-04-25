/// <reference path="../lib/underscore/underscore-1.4.2.js" />
'use strict';

Application.Controllers.controller('index', ['$scope', 'employee', function ($scope, employee) {

    $scope.person = { tasks: [] };

    employee.individual(function (data) {
        $scope.person = data;
    });

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
    // Task Paging

    $scope.pagedMode = false;
    $scope.currentPage = 0;
    $scope.pageSize = 0;
    $scope.briefPageSize = 4;

    $scope.changePagedMode = function () {
        $scope.pagedMode = !$scope.pagedMode;
    };

}]);