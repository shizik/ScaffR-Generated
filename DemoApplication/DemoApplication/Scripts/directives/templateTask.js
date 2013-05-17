Application.Directives.directive('templateTask', function factory() {
    return {
        restrict: 'E',
        templateUrl: '/content/templates/directives/templateTask.html',
        scope: {
            task: '=',
            available: '=',
            assignables: '=',
            milestones: '=',
            saveFn: '&',
            deleteFn: '&'
        },
        replace: true,
        controller: function ($scope, $location, toastr) {
            console.log('available', $scope.available);

            $scope.taskMode = $scope.task.name == null ? 'new' : 'display';

            $scope.editMode = function () {
                //$scope.taskMode = 'edit';
                // TODO: This is for demo purposes
                $location.path('/task/' + $scope.task.id);
            };

            $scope.assignment = { selectedOption: undefined };
            $scope.$watch('assignment', function (newValue) {
                if (!newValue.selectedOption) return;

                $scope.task.name = newValue.selectedOption;
                $scope.taskMode = 'display';
            }, true);

            $scope.isTeam = false;
            $scope.resolveByAll = null;
            $scope.assign = function (assignee, isTeam) {
                $scope.resolveByAll = null;

                if (assignee && $scope.task.assignee == assignee) {
                    $scope.task.assignee = null;
                    $scope.isTeam = false;
                    return;
                }

                $scope.isTeam = isTeam;
                $scope.task.assignee = assignee || 'On-boarding Employee';
            };

            $scope.isNew = function () {
                return $scope.task.name == null ||
                       $scope.task.assignee == null ||
                       $scope.task.interval == null ||
                       $scope.task.value == null ||
                       $scope.task.isBefore == null ||
                       $scope.task.milestone == null;
            };

            $scope.isDueDateChosen = function () {
                return $scope.task.interval != null ||
                       $scope.task.value != null ||
                       $scope.task.isBefore != null ||
                       $scope.task.milestone != null;
            };

            $scope.newCreated = $scope.isNew();

            //
            // Button actions

            $scope.saveTask = function () {
                // TODO: Add logic for saving
                $scope.newCreated = false;
                $scope.saveFn({ task: $scope.task });
                toastr.success("Saved");
            };

            $scope.deleteTask = function () {
                $scope.deleteFn({ task: $scope.task, isNew: $scope.newCreated });
            };

            $scope.editTask = function () {
                // TODO: Open the details page
            };
        }
    };
});
