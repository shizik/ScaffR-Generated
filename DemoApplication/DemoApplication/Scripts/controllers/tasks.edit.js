Application.Controllers.controller('tasks.edit',
                ['$scope', '$routeParams', 'service.task', 'service.category', 'service.milestone', 'toastr',
        function ($scope, $routeParams, serviceTask, serviceCategory, serviceMilestone, toastr) {
            $scope.$parent.backLinkText = 'Task List';

            serviceCategory.getAll(function (data) {
                $scope.categories = data;
            });

            serviceMilestone.getAll(function (data) {
                $scope.milestones = data;
            });

            serviceTask.getById($routeParams.id, function (data) {
                $scope.task = data;
            });

            //$scope.task = {
            //    name: null,
            //    description: null,
            //    categoryId: null,
            //    assignee: null,
            //    interval: null,
            //    milestoneValue: null,
            //    isBefore: null,
            //    milestoneId: null
            //};

            $scope.isDueDateChosen = function () {
                if (!$scope.task) return false;

                return $scope.task.interval != null &&
                       $scope.task.isBefore != null &&
                       $scope.task.milestoneValue != null &&
                       $scope.task.milestoneId != null;
            };

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

            $scope.save = function () {
                serviceTask.update($scope.task, function (id) {
                    toastr.success('Saved.');
                });
            };

            $scope.cancel = function () {
                window.history.back();
            };

        }]);