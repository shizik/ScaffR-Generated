Application.Directives.directive('tile', function factory(employeeUtils) {
    return {
        restrict: 'E',
        templateUrl: '/content/templates/employee/tile.html',
        scope: {
            person: '=',
            filter: '=',
            mode: '@'
        },
        replace: true,
        controller: function ($scope) {

            $scope.filter = 'all';

            $scope.goToDetails = function () {
                if ($scope.mode == 'detail') return;

                // TODO: Should use the location service
                window.location.href = '/employee/index/' + $scope.person.id;
            };

            $scope.counts = function () {
                return employeeUtils.getCounts($scope.person);
            };

            $scope.badgeClass = '';
            $scope.badgeCount = function () {
                var counts = $scope.counts();

                $scope.badgeClass = counts.overdue > 0 ? 'badge-warning' : 'badge-info';

                return counts.overdue > 0 ? counts.overdue : counts.open;
            };
        }
    };
});
