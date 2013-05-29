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
        controller: ['$scope', '$location', 'service.task', 'service.assignment', 'toastr', function ($scope, $location, serviceTask, serviceAssignment, toastr) {
            $scope.employeeId = $scope.$parent.person.id;

            $scope.setTask = function (task) {
                $scope.task.name = task.name;
                $scope.task.description = task.description;
                $scope.task.taskId = task.id;
                $scope.task.principalIsTeam = task.principalIsTeam;
                $scope.task.principalId = task.principalId;
                $scope.task.resolveByOne = task.resolveByOne;
                $scope.task.employeeId = $scope.employeeId;
                serviceTask.getDueDateFromMilestone($scope.employeeId, task, function (data) {
                    $scope.task.dueDate = data;
                });
            };

            $scope.isNew = function () {
                return $scope.task.name == null || $scope.task.principalId == null || $scope.task.dueDate == null;
            };

            $scope.newCreated = $scope.isNew();

            //
            // Button actions

            //$scope.$watch('task.dueDate', function (value) {
            //    serviceAssignment.update($scope.task, function () {
            //        toastr.success("Changes Saved");
            //    });
            //});

            $scope.saveTask = function () {
                // TODO: Add logic for saving
                $scope.newCreated = false;
                $scope.saveFn({ task: $scope.task });
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
