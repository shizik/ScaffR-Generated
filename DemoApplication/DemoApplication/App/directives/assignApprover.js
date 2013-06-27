NetGuide.Directives.directive('assignApprover', ['$config', function factory($config) {
    return {
        templateUrl: $config.templatesRoot + 'assignApprover.html',
        scope: {
            task: '=',
            assignables: '=',
            css: '@'
        },
        replace: true,
        controller: function ($scope) {
            $scope.approver = null;

            $scope.assign = function (approver) {
                // Handle deselecting an item
                if (approver && $scope.task.approverId == approver.id) {
                    $scope.task.approverId = null;
                    $scope.approver = null;
                    return;
                }

                if (approver) {
                    $scope.approver = approver;
                    $scope.task.approverId = approver.id;
                }
            };

            $scope.$watch('task.approverId', function (value) {
                if (value === undefined) return;

                if ($scope.approver == null || $scope.approver.id != value)
                    $scope.approver = findApprover();
            }, true);

            // Handles the case when assignables are loaded after the task
            $scope.$watch('assignables', function (value) {
                if (!value || !$scope.task || !$scope.task.approverId || value.length == 0) return;

                $scope.approver = findApprover();
            });

            function findApprover() {
                return _.find($scope.assignables, function (item) { return !item.isTeam && item.id == $scope.task.approverId; });
            }
        }
    };
}]);
