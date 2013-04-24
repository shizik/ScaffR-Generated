/// <reference path="../lib/underscore/underscore-1.4.2.js" />
'use strict';

Application.Controllers.controller('index', ['$scope', 'employee', function ($scope, employee) {

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

    employee.individual(function (data) {
        $scope.person = data;
    });

}]);