Application.Directives.directive('tile', function factory(employeeUtils) {
    return {
        restrict: 'E',
        templateUrl: '/content/templates/employee/tile.html',
        scope: {
            entity: '=',
            filter: '=',
            detailsUrl: '@',
            mode: '@'
        },
        replace: true,
        controller: function ($scope, $location) {

            $scope.$watch('mode', function (value) {
                if (!value || value == 'list') return;

                $scope.filter = 'all';
            });

            $scope.changeFilter = function (filter) {
                if ($scope.mode == 'list') return;

                $scope.filter = filter;
            };

            $scope.goToDetails = function () {
                if ($scope.mode == 'detail') return;

                $location.path($scope.detailsUrl + $scope.entity.id);
            };

            $scope.badgeClass = '';
            $scope.badgeCount = function () {
                $scope.badgeClass = $scope.entity.overdue > 0 ? 'badge-warning' : 'badge-info';

                return $scope.entity.overdue + $scope.entity.open;
            };
        }
    };
});
