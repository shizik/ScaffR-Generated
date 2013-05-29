Application.Directives.directive('assignPrincipal', function factory() {
    return {
        templateUrl: '/content/templates/directives/assignPrincipal.html',
        scope: {
            task: '=',
            assignables: '=',
            defaultId: '@',
            css: '@'
        },
        replace: true,
        controller: function ($scope) {
            $scope.principal = null;

            $scope.assign = function (principal) {
                $scope.resolveByAll = null;

                // Handle deselecting an item
                if (principal && $scope.task.principalId == principal.id) {
                    $scope.task.principalId = null;
                    $scope.task.principalIsTeam = false;
                    $scope.principal = null;
                    return;
                }

                if (principal) {
                    $scope.principal = principal;
                    $scope.task.principalIsTeam = principal.isTeam;
                    $scope.task.principalId = principal.id;
                }
                else if ($scope.defaultId) {
                    $scope.task.principalIsTeam = false;
                    $scope.task.principalId = $scope.defaultId;
                } else {
                    $scope.task.principalIsTeam = false;
                    $scope.task.principalId = undefined;
                    $scope.principal = { id: 0, name: 'On-boarding Employee' };
                }
            };

            $scope.$watch('task.principalId', function (value) {
                if (!value) return;

                if ($scope.principal == null || $scope.principal.id != value)
                    $scope.principal = findPrincipal();
            });

            function findPrincipal() {
                return _.find($scope.assignables,
                    function (item) {
                        return item.id == $scope.task.principalId &&
                            item.isTeam == $scope.task.principalIsTeam;
                    });
            }
        }
    };
});
