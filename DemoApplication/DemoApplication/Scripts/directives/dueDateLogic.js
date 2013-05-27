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

            if ($scope.task.milestoneValue) {
                $scope.chosenValue = _.contains(intervalValues, $scope.task.milestoneValue) ?
                                     $scope.task.milestoneValue : 'custom';
            }

            $scope.$watch('chosenValue', function (newValue) {
                if (newValue == 'custom') {
                    if (_.contains(intervalValues, $scope.task.milestoneValue)) $scope.task.milestoneValue = undefined;
                    return;
                }

                $scope.task.milestoneValue = newValue;
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
