'use strict';

Application.Controllers.controller('index', ['$scope', 'employees', 'tasks', 'templates', function ($scope, employees, tasks, templates) {

    $scope.display = 'tiles';
    $scope.sort = 'za';

    $scope.items = employees.getSummary();

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

}]);

Application.Controllers.controller('add', function ($scope) {

    $scope.message = 'hello';

})