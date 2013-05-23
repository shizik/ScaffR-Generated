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
                $location.path('/tasks/' + $scope.task.id);
            };

            $scope.assignment = { selectedOption: undefined };
            $scope.$watch('assignment', function (newValue) {
                if (!newValue.selectedOption) return;

                $scope.task.name = newValue.selectedOption;
                $scope.taskMode = 'display';
            }, true);

            $scope.isTeam = false;
            $scope.resolveByAll = null;
            $scope.assign = function (principal, isTeam) {
                $scope.resolveByAll = null;

                if (principal && $scope.task.principalId == principal.id) {
                    $scope.task.principalId = null;
                    $scope.isTeam = false;
                    $scope.principal = null;
                    return;
                }

                $scope.isTeam = isTeam;
                $scope.principal = principal ||
                    {
                        id: $scope.$parent.person.id,
                        name: $scope.$parent.person.firstName + ' ' + $scope.$parent.person.lastName
                    };

                $scope.task.principalId = $scope.principal.id;
            };

            $scope.isNew = function () {
                return $scope.task.name == null || $scope.task.principalId == null || $scope.task.dueDate == null;
            };

            $scope.newCreated = $scope.isNew();

            if ($scope.task && $scope.task.principalId != null)
                $scope.principal = _.find($scope.assignables, function (item) { return item.id == $scope.task.principalId; });

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
