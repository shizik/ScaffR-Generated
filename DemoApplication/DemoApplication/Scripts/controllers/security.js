'use strict';

Application.Controllers.controller('index', ['$scope', 'groups', function ($scope, groups) {

    groups.get('asdf asdf');

    $scope.phones = [
        {
            "name": "asdf",
            "number": "asdf"
        }
    ];
    
    $scope.open = function() {
        alert('open');
    };
    
}]);

Application.Controllers.controller('add', function($scope) {

    $scope.message = 'hello';

})