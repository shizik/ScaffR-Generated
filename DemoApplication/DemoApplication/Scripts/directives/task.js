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
        controller: ['$scope', '$location', 'service.task', 'toastr', function ($scope, $location, serviceTask, toastr) {
            $scope.taskMode = $scope.task.name == null ? 'new' : 'display';

            $scope.editMode = function () {
                $location.path('/tasks/1'/* + $scope.task.id*/);
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
                $scope.task.assignee = assignee ||
                    ($scope.$parent.person.firstName + ' ' + $scope.$parent.person.lastName);
            };

            $scope.isNew = function () {
                return $scope.task.name == null || $scope.task.assigneeId == null || $scope.task.dueDate == null;
            };

            $scope.newCreated = $scope.isNew();


            $scope.preventClosing = function ($event) {
                $event.stopPropagation();
            };

            $scope.$watch('task', function (value) {
                debugger;
                serviceTask.update(value, function () {
                    toastr.success("Saved");
                });
            });

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
        }]
    };
});
