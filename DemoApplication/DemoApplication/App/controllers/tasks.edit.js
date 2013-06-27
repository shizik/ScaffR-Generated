NetGuide.Controllers.controller('tasks.edit',
                ['$scope', '$http', '$routeParams', 'service.task', 'service.assignment', 'service.principal', 'service.category', 'service.milestone', 'utils.common', 'toastr',
        function ($scope, $http, $routeParams, serviceTask, serviceAssignment, servicePrincipal, serviceCategory, serviceMilestone, commonUtils, toastr) {
            $scope.$parent.backLinkText = 'Task List';

            $scope.hasApprover = false;
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

            var numberOfRelatedTasks = 0;
            if ($scope.isNew) {
                var task = serviceTask.getEmpty();
                if ($routeParams.categoryId)
                    task.categoryId = parseInt($routeParams.categoryId);

                $scope.task = task;
            } else {
                if ($scope.isFromEmployee) {
                    serviceAssignment.getById($routeParams.assignmentId, function (data) {
                        $scope.task = data;
                        $scope.employeeId = $scope.task.employeeId;
                        $scope.hasApprover = data.approverId != null;
                    });

                    serviceAssignment.getAttachments($routeParams.assignmentId, function (data) {
                        $scope.queue = data;
                    });
                } else {
                    serviceTask.getById($routeParams.taskId, function (data) {
                        $scope.task = data;
                        $scope.hasApprover = data.approverId != null;
                        if ($scope.task.parentTaskId) return;

                        serviceTask.getNumberOfRelatedTasks($routeParams.taskId, function (num) {
                            numberOfRelatedTasks = num;
                        });
                    });

                    serviceTask.getAttachments($routeParams.taskId, function (data) {
                        $scope.queue = data;
                    });
                }
            }

            if (command != 'updateAssignment') {
                $scope.intervals = [undefined, "Days", "Weeks", "Months", "Quarters"];
                $scope.$watch('task.milestoneId', function (value) {
                    if (!value) return;

                    $scope.milestone = _.find($scope.milestones, function (item) { return item.id == value; });
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
                var files = _.filter(_.pluck($scope.queue, 'id'), function (id) { return !!id; });
                if (files.length > 0)
                    $scope.task.files = files.join();

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
                    if (numberOfRelatedTasks > 0)
                        $scope.task.updateRelated = confirm("Apply changes to " + numberOfRelatedTasks + " related tasks?");

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
            // Attachments

            $scope.options = {
                url: 'api/attachment',
                maxNumberOfFiles: 1
            };

            $scope.$watch('task.requiresDownload', function (value) {
                if (!value) {
                    _.forEach($scope.queue, function (item) {
                        $scope.deleteFile(item);
                    });
                }
            });

            $scope.deleteFile = function (file) {
                if (!$scope.isNew)
                    commonUtils.removeFromList(file, $scope.queue);
                else {
                    $http.delete(file.deleteUrl).then(
                        function () {
                            $scope.clear(file);
                        }
                    );
                }
            };
        }]);