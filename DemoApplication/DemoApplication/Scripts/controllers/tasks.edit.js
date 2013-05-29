﻿Application.Controllers.controller('tasks.edit',
                ['$scope', '$routeParams', 'service.task', 'service.assignment', 'service.principal', 'service.category', 'service.milestone', 'toastr',
        function ($scope, $routeParams, serviceTask, serviceAssignment, servicePrincipal, serviceCategory, serviceMilestone, toastr) {
            $scope.$parent.backLinkText = 'Task List';

            $scope.isNew = $routeParams.templateId != undefined ||
                           $routeParams.employeeId != undefined ||
                          ($routeParams.assignmentId == undefined &&
                           $routeParams.taskId == undefined);
            $scope.isFromEmployee = $routeParams.assignmentId != undefined ||
                                    $routeParams.employeeId != undefined;

            // Build the proper save command name
            var command = $scope.isNew ? 'new' : 'update';
            if ($scope.isFromEmployee) command += 'Assignment';
            else if (command == 'new' && $routeParams.templateId != undefined) command += 'InTemplate';
            else command += 'Task';

            console.log('command', command);

            serviceCategory.getAll(function (data) {
                $scope.categories = data;
            });

            serviceMilestone.getAll(function (data) {
                $scope.milestones = data;
            });

            servicePrincipal.getAll(function (data) {
                $scope.assignables = data;
            });

            if ($scope.isNew) {
                $scope.task = serviceTask.getEmpty();
            } else {
                if ($scope.isFromEmployee)
                    serviceAssignment.getById($routeParams.assignmentId, function (data) {
                        $scope.task = data;
                    });
                else
                    serviceTask.getById($routeParams.taskId, function (data) {
                        $scope.task = data;
                    });
            }

            if (command != 'updateAssignment') {
                $scope.intervals = [undefined, "Days", "Weeks", "Months", "Quarters"];
                $scope.$watch('task.milestoneId', function (value) {
                    if (!value) return;

                    $scope.milestone = _.find($scope.milestones, function (item) { return item.id == value; }).name;
                }, true);

                $scope.isDueDateChosen = function () {
                    if (!$scope.task) return false;

                    return $scope.task.interval != null &&
                        $scope.task.isBefore != null &&
                        $scope.task.milestoneValue != null &&
                        $scope.task.milestoneId != null;
                };
            }

            $scope.save = function () {
                saveCommands[command]();
            };

            var saveCommands = {
                'newAssignment': function () {
                    $scope.task.employeeId = $routeParams.employeeId;
                    serviceTask.getDueDateFromMilestone($scope.task.employeeId, $scope.task, function (data) {
                        $scope.task.dueDate = data;

                        serviceAssignment.addFromTask($scope.task, function () {
                            window.history.back();
                            toastr.success('Saved.');
                        });
                    });
                },
                'newInTemplate': function () {
                    $scope.task.templateId = $routeParams.templateId;
                    serviceTask.addInTemplate($scope.task, function () {
                        window.history.back();
                        toastr.success('Saved.');
                    });
                },
                'newTask': function () {
                    serviceTask.add($scope.task, function () {
                        window.history.back();
                        toastr.success('Saved.');
                    });
                },
                'updateAssignment': function () {
                    serviceAssignment.update($scope.task, function () {
                        window.history.back();
                        toastr.success('Saved.');
                    });
                },
                'updateTask': function () {
                    serviceTask.update($scope.task, function () {
                        window.history.back();
                        toastr.success('Saved.');
                    });
                }
            };

            $scope.cancel = function () {
                window.history.back();
            };

            //
            // Attachments / Actions

            $scope.attachments = [];
            $scope.actions = [];

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

        }]);