Application.Directives.directive('assignmentDetail', function factory() {
    return {
        templateUrl: '/content/templates/directives/assignmentDetail.html',
        scope: {
            assignmentId: '=',
            backFn: '&'
        },
        replace: true,
        controller: ['$scope', 'service.assignment', function ($scope, serviceAssignment) {

            $scope.$watch('assignmentId', function (value) {
                if (!value) return;

                serviceAssignment.getById(value, function (data) {
                    $scope.assignment = data;
                });
            }, true);

            $scope.complete = function () {
                serviceAssignment.complete($scope.assignmentId, function (data) {
                    $scope.assignment = data;
                });
            };

            $scope.backToList = function () {
                $scope.backFn();
            };

        }]
    };
});
