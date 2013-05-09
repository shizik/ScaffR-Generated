Application.Directives.directive('task', function factory() {
    return {
        restrict: 'E',
        templateUrl: '/content/templates/employee/task.html',
        scope: {
            task: '=',
            available: '=',
            assignables: '=',
            saveFn: '&',
            deleteFn: '&',
            detailsFn: '&'
        },
        replace: true,
        controller: function ($scope) {
            $scope.taskMode = $scope.task.name == null ? 'new' : 'display';

            $scope.editMode = function () {
                //$scope.taskMode = 'edit';
                // TODO: This is for demo purposes
                window.location.href = '/tasks/ondemand/1';
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

                if ($scope.task.assignee == assignee) {
                    $scope.task.assignee = null;
                    $scope.isTeam = false;
                    return;
                }

                $scope.isTeam = isTeam;
                $scope.task.assignee = assignee || $scope.$parent.person.name;
            };

            $scope.isNew = function () {
                return $scope.task.name == null || $scope.task.assignee == null || $scope.task.due == null;
            };

            $scope.newCreated = $scope.isNew();


            $scope.preventClosing = function ($event) {
                $event.stopPropagation();
            };

            $scope.days = function () {
                if ($scope.task.due == null) return 0;

                return moment($scope.task.due).diff(moment(), 'days');
            };

            $scope.isOverdue = function () {
                return $scope.days() < 0;
            };

            $scope.dateClass = function () {
                if ($scope.task.isDone) return 'success';
                else if ($scope.days() < 0) return 'warning';
                else if ($scope.days() == 0) return 'error';

                return 'info';
            };

            //
            // Button actions

            $scope.saveTask = function () {
                // TODO: Add logic for saving
                $scope.newCreated = false;
                $scope.saveFn({ task: $scope.task });
                toastr.success("Saved");
            };

            $scope.details = function () {
                $scope.detailsFn({ task: $scope.task });
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
