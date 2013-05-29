Application.Directives.directive('dueDateLogic', function factory() {
    return {
        templateUrl: '/content/templates/directives/dueDateLogic.html',
        scope: {
            task: '=',
            milestones: '='
        },
        replace: true,
        controller: function ($scope) {
            var intervalValues = ['10', '15', '30', '45', '60'];

            $scope.intervals = [undefined, "Days", "Weeks", "Months", "Quarters"];

            $scope.$watch('task', function (value) {
                if (!value || $scope.chosenValue) return;

                $scope.chosenValue = _.contains(intervalValues, $scope.task.milestoneValue) ?
                                     $scope.task.milestoneValue : 'custom';

                $scope.isBefore = $scope.task.isBefore !== null ?
                                  $scope.task.isBefore.toString() :
                                  undefined;
            });


            $scope.$watch('chosenValue', function (newValue) {
                if (!$scope.task) return;

                if (newValue == 'custom') {
                    if (_.contains(intervalValues, $scope.task.milestoneValue)) $scope.task.milestoneValue = undefined;
                    return;
                }

                $scope.task.milestoneValue = newValue;
            }, true);

            $scope.$watch('isBefore', function (newValue) {
                if (!newValue || !$scope.task) return;

                $scope.task.isBefore = newValue === 'true';
            }, true);
        }
    };
});
