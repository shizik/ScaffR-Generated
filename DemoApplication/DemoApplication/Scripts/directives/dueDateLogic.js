Application.Directives.directive('dueDateLogic', function factory() {
    return {
        templateUrl: '/content/templates/directives/dueDateLogic.html',
        scope: {
            task: '=',
            milestones: '='
        },
        replace: true,
        controller: function ($scope, $location, toastr) {
            var intervalValues = ['10', '15', '30', '45', '60'];
            if ($scope.task.value) {
                $scope.chosenValue = _.contains(intervalValues, $scope.task.value) ?
                                     $scope.task.value : 'custom';
            }

            $scope.$watch('chosenValue', function (newValue) {
                if (newValue == 'custom') {
                    if (_.contains(intervalValues, $scope.task.value)) $scope.task.value = undefined;
                    return;
                }

                $scope.task.value = newValue;
            }, true);

            $scope.isBefore = $scope.task.isBefore !== null ?
                              $scope.task.isBefore.toString() :
                              undefined;

            $scope.$watch('isBefore', function (newValue) {
                if (!newValue) return;

                $scope.task.isBefore = newValue === 'true';
            }, true);
        }
    };
});
