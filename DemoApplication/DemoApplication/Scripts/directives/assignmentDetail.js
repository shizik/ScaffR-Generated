Application.Directives.directive('assignmentDetail', function factory() {
    return {
        templateUrl: '/content/templates/directives/assignmentDetail.html',
        scope: {
            assignmentId: '=',
            userId: '@',
            backFn: '&'
        },
        replace: true,
        controller: ['$scope', 'service.assignment', function ($scope, serviceAssignment) {

            $scope.$watch('assignmentId', function (value) {
                if (!value) return;

                serviceAssignment.getByIdEmployeeId(value, $scope.userId, function (data) {
                    $scope.assignment = data;
                });
            }, true);

            $scope.complete = function () {
                serviceAssignment.complete($scope.assignmentId, $scope.userId, function (data) {
                    $scope.assignment = data;
                });
            };

            $scope.backToList = function () {
                $scope.backFn();
            };

        }]
    };
});
