﻿Application.Directives.directive('templateTask', function factory() {
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
            $scope.templateId = $scope.$parent.template.id;

            $scope.assignment = { selectedOption: undefined };
            $scope.$watch('assignment', function (newValue) {
                if (!newValue.selectedOption) return;

                $scope.task.name = newValue.selectedOption;
            }, true);

            $scope.intervals = [undefined, "Days", "Weeks", "Months", "Quarters"];
            $scope.$watch('task.milestoneId', function (value) {
                if (!value) return;

                $scope.milestone = _.find($scope.milestones, function (item) { return item.id == value; }).name;
            }, true);

            $scope.isNew = function () {
                return $scope.task.name == null ||
                       $scope.task.principalId == null ||
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
