Application.Controllers.controller('tasks.edit',
                ['$scope', '$routeParams', 'service.task', 'service.assignment', 'service.category', 'service.milestone', 'toastr',
        function ($scope, $routeParams, serviceTask, serviceAssignment, serviceCategory, serviceMilestone, toastr) {
            $scope.$parent.backLinkText = 'Task List';

            $scope.isNew = $routeParams.templateId != undefined || $routeParams.employeeId != undefined;
            $scope.isFromEmployee = $routeParams.assignmentId != undefined || $routeParams.employeeId != undefined;

            serviceCategory.getAll(function (data) {
                $scope.categories = data;
            });

            serviceMilestone.getAll(function (data) {
                $scope.milestones = data;
            });
            
            $scope.intervals = [undefined, "Days", "Weeks", "Months", "Quarters"];
            $scope.$watch('task.milestoneId', function (value) {
                if (!value) return;

                $scope.milestone = _.find($scope.milestones, function (item) { return item.id == value; }).name;
            }, true);

            if ($scope.isNew) {
                $scope.task = serviceTask.getEmpty();
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
                    if ($scope.isFromEmployee)
                        serviceAssignment.addFromTask($scope.task, function () {
                            window.history.back();
                            toastr.success('Saved.');
                        });
                    else
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