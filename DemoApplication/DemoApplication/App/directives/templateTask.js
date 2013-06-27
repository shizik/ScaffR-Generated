NetGuide.Directives.directive('templateTask', ['$config', function factory($config) {
    return {
        restrict: 'E',
        templateUrl: $config.templatesRoot + 'templateTask.html',
        scope: {
            task: '=',
            available: '=',
            assignables: '=',
            milestones: '=',
            saveFn: '&',
            deleteFn: '&'
        },
        replace: true,
        controller: ['$scope', '$location', 'service.task', 'toastr', function ($scope, $location, serviceTask, toastr) {
            $scope.templateId = $scope.$parent.template.id;

            $scope.setTask = function (task) {
                $scope.task.name = task.name;
                $scope.task.description = task.description;
                $scope.task.parentTaskId = task.id;

                $scope.task.milestoneId = task.milestoneId;
                $scope.task.milestoneValue = task.milestoneValue;
                $scope.task.interval = task.interval;
                $scope.task.isBefore = task.isBefore;

                $scope.task.principalIsTeam = task.principalIsTeam;
                $scope.task.resolvedByOne = task.resolvedByOne;
                $scope.task.principalId = task.principalId;
                $scope.task.approverId = task.approverId;

                $scope.task.requiresSignature = task.requiresSignature;
                $scope.task.requiresDownload = task.requiresDownload;
                $scope.task.requiresUpload = task.requiresUpload;
                $scope.task.recurring = task.recurring;
            };

            $scope.intervals = [undefined, "Days", "Weeks", "Months", "Quarters"];
            $scope.$watch('task.milestoneId', function (value) {
                if (!value) return;

                $scope.milestone = _.find($scope.milestones, function (item) { return item.id == value; }).name;
            }, true);

            $scope.isNew = function () {
                return $scope.task.name == null ||
                       $scope.task.principalId === undefined ||
                       $scope.task.interval == null ||
                       $scope.task.isBefore == null ||
                       $scope.task.milestoneValue == null ||
                       $scope.task.milestoneId == null;
            };

            $scope.isDueDateChosen = function () {
                return $scope.task.interval != null &&
                       $scope.task.isBefore != null &&
                       $scope.task.milestoneValue != null &&
                       $scope.task.milestoneId != null;
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

                serviceTask.update($scope.task, function () {
                    toastr.success("Changes Saved");
                });
            }, true);

            //
            // Button actions

            $scope.saveTask = function () {
                $scope.newCreated = false;
                $scope.saveFn({ task: $scope.task });
            };

            $scope.deleteTask = function () {
                $scope.deleteFn({ task: $scope.task, isNew: $scope.newCreated });
            };
        }]
    };
}]);
