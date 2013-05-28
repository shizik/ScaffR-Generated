Application.Controllers.controller('tasks.edit',
                ['$scope', '$routeParams', 'service.task', 'service.assignment', 'service.principal', 'service.category', 'service.milestone', 'toastr',
        function ($scope, $routeParams, serviceTask, serviceAssignment, servicePrincipal, serviceCategory, serviceMilestone, toastr) {
            $scope.$parent.backLinkText = 'Task List';

            $scope.isNew = $routeParams.templateId != undefined || $routeParams.employeeId != undefined;
            $scope.isFromEmployee = $routeParams.assignmentId != undefined || $routeParams.employeeId != undefined;

            serviceCategory.getAll(function (data) {
                $scope.categories = data;
            });

            serviceMilestone.getAll(function (data) {
                $scope.milestones = data;
            });

            servicePrincipal.getAll(function (data) {
                $scope.assignables = data;
            });

            $scope.intervals = [undefined, "Days", "Weeks", "Months", "Quarters"];
            $scope.$watch('task.milestoneId', function (value) {
                if (!value) return;

                $scope.milestone = _.find($scope.milestones, function (item) { return item.id == value; }).name;
            }, true);

            $scope.task = serviceTask.getEmpty();

            if ($scope.isNew) {
                if ($routeParams.templateId)
                    $scope.task.templateId = $routeParams.templateId;
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

            $scope.isDueDateChosen = function () {
                if (!$scope.task) return false;

                return $scope.task.interval != null &&
                    $scope.task.isBefore != null &&
                    $scope.task.milestoneValue != null &&
                    $scope.task.milestoneId != null;
            };

            $scope.save = function () {
                if ($scope.isNew) {
                    if ($scope.isFromEmployee) {
                        $scope.task.employeeId = $routeParams.employeeId;
                        serviceTask.getDueDateFromMilestone($scope.task.employeeId, $scope.task, function (data) {
                            $scope.task.dueDate = data;

                            serviceAssignment.addFromTask($scope.task, function () {
                                window.history.back();
                                toastr.success('Saved.');
                            });
                        });
                    } else
                        serviceTask.addInTemplate($scope.task, function () {
                            window.history.back();
                            toastr.success('Saved.');
                        });
                } else {
                    if ($scope.isFromEmployee)
                        serviceAssignment.update($scope.task, function () {
                            window.history.back();
                            toastr.success('Saved.');
                        });
                    else
                        serviceTask.update($scope.task, function () {
                            window.history.back();
                            toastr.success('Saved.');
                        });
                }
            };

            $scope.cancel = function () {
                window.history.back();
            };

            $scope.isTeam = false;
            $scope.resolveByAll = null;
            $scope.assign = function (principalId, isTeam) {
                $scope.resolveByAll = null;

                // Handle deselecting an item
                if (principalId && $scope.task.principalId == principalId) {
                    $scope.task.principalId = null;
                    $scope.isTeam = false;
                    return;
                }

                $scope.isTeam = isTeam;
                $scope.task.principalId = principalId || $scope.$parent.person.id;
            };

            $scope.$watch('task.principalId', function (value) {
                if (value == null)
                    $scope.principal = null;
                else
                    $scope.principal = _.find($scope.assignables, function (item) { return item.id == value; });
            });

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