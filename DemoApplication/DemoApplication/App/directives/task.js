﻿NetGuide.Directives.directive('task', ['$config', function factory($config) {
    return {
        restrict: 'E',
        templateUrl: $config.templatesRoot + 'task.html',
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
            $scope.employeeId = $scope.$parent.$parent.person.id;

            $scope.setTask = function (task) {
                $scope.task.name = task.name;
                $scope.task.description = task.description;
                $scope.task.taskId = task.id;

                $scope.task.principalIsTeam = task.principalIsTeam;
                $scope.task.resolvedByOne = task.resolvedByOne;
                $scope.task.principalId = task.principalId;
                $scope.task.approverId = task.approverId;
                $scope.task.employeeId = $scope.employeeId;

                $scope.task.requiresSignature = task.requiresSignature;
                $scope.task.requiresDownload = task.requiresDownload;
                $scope.task.requiresUpload = task.requiresUpload;
                $scope.task.recurring = task.recurring;

                serviceTask.getDueDateFromMilestone($scope.employeeId, task, function (data) {
                    $scope.task.dueDate = data;
                });
            };

            $scope.isNew = function () {
                return $scope.task.name == null || $scope.task.principalId === undefined || $scope.task.dueDate == null;
            };

            $scope.newCreated = $scope.isNew();

            //
            // Automatic saving changes

            var firstLoad = true;
            $scope.$watch('task', function (value) {
                if (!value || $scope.task.id == 0) return;

                if (firstLoad) {
                    firstLoad = false;
                    return;
                }

                serviceAssignment.update($scope.task, function () {
                    toastr.success("Changes Saved");
                });
            }, true);

            //
            // Button actions

            $scope.saveTask = function () {
                $scope.newCreated = false;
                $scope.saveFn({ task: $scope.task });
            };

            $scope.details = function () {
                $scope.detailsFn({ task: $scope.task });
            };

            $scope.deleteTask = function () {
                $scope.deleteFn({ task: $scope.task, isNew: $scope.newCreated });
            };
        }]
    };
}]);