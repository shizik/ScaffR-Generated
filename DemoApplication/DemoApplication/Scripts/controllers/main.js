'use strict';

Application.Controllers.controller('mainController', ['$scope', '$location', function ($scope, $location) {
    $scope.backLinkText = undefined;

    $scope.showBackLink = function () {
        return $scope.backLinkText !== undefined;
    };

    $scope.goBack = function () {
        window.history.back();
    };
}]);
