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

                $scope.options = {
                    url: 'api/assignment/upload?id=' + value,
                    maxNumberOfFiles: 2
                };

                serviceAssignment.getByIdEmployeeId(value, $scope.userId, function (data) {
                    $scope.assignment = data.assignment;
                    $scope.queue = data.attachments;
                    $scope.activity = data.activity;
                    
                    $scope.conditionsMet = function () {
                        if ($scope.assignment.requiresSignature &&
                            !$scope.signature) return false;

                        return $scope.hasUploaded();
                    };

                    $scope.hasUploaded = function () {
                        if (!$scope.assignment.requiresUpload) return true;

                        return _.some($scope.queue, function (item) { return item.isUpload; });
                    };
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
