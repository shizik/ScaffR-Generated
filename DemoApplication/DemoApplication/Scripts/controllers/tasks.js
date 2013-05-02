/// <reference path="../lib/underscore/underscore-1.4.2.js" />
/// <reference path="~/Scripts/lib/angular/angular.js" />
'use strict';

Application.Controllers.controller('tasks', ['$scope', 'tasks', function ($scope, tasks) {

    $scope.task = function () {

    };

    $scope.save = function () {

    };

}]);

Application.Controllers.controller('ondemand', ['$scope', 'tasks', 'categories', function ($scope, tasks, categories) {

    $scope.categories = categories.list();
    $scope.task = tasks.getById(0);
    $scope.attachments = [];
    $scope.actions = [];

    $scope.dueDate = undefined;

    $scope.selectedMilestone = undefined;
    $scope.milestone = { selectedOption: undefined };
    $scope.$watch('milestone', function (value) {
        if (!value.selectedOption) return;

        $scope.selectedMilestone = _.find($scope.task.milestones, function (item) {
            return item.id == value.selectedOption;
        });

        console.log('selectedMilestone', $scope.selectedMilestone);
    }, true);

    $scope.dueDateHumanize = function () {
        if (!$scope.dueDate || !$scope.selectedMilestone) return undefined;

        var start = moment($scope.selectedMilestone.date);
        var end = moment($scope.dueDate);

        return end.from(start);
    };

    function clearAttachment() {
        $scope.title = '';
        $scope.fileName = '';
        $scope.signatureRequired = false;
        $scope.downloadRequired = false;
        $scope.attachmentMode = false;
    }

    function clearAction() {
        $scope.actionName = '';
        $scope.actionMode = false;
    }

    $scope.createAttachment = function () {

        var attachment = {
            title: $scope.title,
            fileName: $scope.fileName,
            downloadRequired: $scope.downloadRequired,
            signatureRequired: $scope.signatureRequired,
            actions: []
        };

        if (attachment.signatureRequired) {
            var signAction = {
                title: 'Sign Form ' + attachment.title
            };
            $scope.actions.push(signAction);
        }

        if (attachment.downloadRequired) {
            var downloadAction = {
                title: 'Download Form ' + attachment.title
            };
            $scope.actions.push(downloadAction);
        }

        $scope.attachments.push(attachment);

        clearAttachment();
    };

    $scope.removeAttachment = function (index) {
        $scope.attachments.splice(index, 1);
    };

    $scope.removeAction = function (index) {
        $scope.actions.splice(index, 1);
    };

    $scope.createAction = function (name) {
        $scope.actions.push({ title: name });
        clearAction();
    };

    $scope.save = function () {
        toastr.success('Saved.');
    };

    $scope.cancel = function () {
        window.history.back();
    };

}]);