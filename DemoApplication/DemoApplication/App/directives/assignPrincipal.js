﻿NetGuide.Directives.directive('assignPrincipal', ['$config', function factory($config) {
    return {
        templateUrl: $config.templatesRoot + 'assignPrincipal.html',
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
                // Handle deselecting an item
                if (principal && $scope.task.principalId == principal.id) {
                    $scope.task.principalId = undefined;
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
                    $scope.task.principalId = null;
                    $scope.principal = { id: 0, name: 'On-boarding Employee' };
                }
            };

            $scope.$watch('task.principalId', function (value) {
                if (value === undefined) return;

                if ($scope.principal == null || $scope.principal.id != value)
                    $scope.principal = findPrincipal();
            }, true);

            // Handles the case when assignables are loaded after the task
            $scope.$watch('assignables', function (value) {
                if (!value || !$scope.task || $scope.task.principalId === undefined || value.length == 0) return;

                $scope.principal = findPrincipal();
            });

            function findPrincipal() {
                if ($scope.task.principalId == null) {
                    if (!$scope.defaultId) return { id: 0, name: 'On-boarding Employee' };

                    $scope.task.principalIsTeam = false;
                    $scope.task.principalId = $scope.defaultId;
                }

                return _.find($scope.assignables,
                    function (item) {
                        return item.id == $scope.task.principalId &&
                               item.isTeam == $scope.task.principalIsTeam;
                    });
            }
        }
    };
}]);