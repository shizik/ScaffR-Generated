NetGuide.Controllers.controller('mainController', ['$scope', function ($scope) {
    $scope.backLinkText = undefined;

    $scope.showBackLink = function () {
        return $scope.backLinkText !== undefined;
    };

    $scope.goBack = function () {
        window.history.back();
    };
}]);
