'use strict';

Application.Controllers.controller('index', ['$scope', 'groups', function ($scope, groups) {

    $scope.display = 'tiles';
    $scope.sort = 'za';

    var items = [
        {
            "name": "John Smith",
            "open": 1,
            "overdue": 0,
            "closed": 2,
            "tasks": 3
        },{
            "name": "John Hancock",
            "open": 1,
            "overdue": 0,
            "closed": 2,
            "tasks": 3
        }
    ];

    $scope.getItems = function () {       
        return items;
    };

    $scope.changeDisplay = function (mode) {
        $scope.display = mode;
    };

    $scope.changeSort = function(sort) {
        $scope.sort = sort;
    };

    $scope.getSortLabel = function(sort) {
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