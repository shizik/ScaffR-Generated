Application.Controllers.controller('tasks.edit',
                ['$scope', 'service.task', 'service.category', 'toastr',
        function ($scope, serviceTask, serviceCategory, toastr) {
            $scope.$parent.backLinkText = 'Task List';

            serviceCategory.getAll(function (data) {
                $scope.categories = data;
            });

            $scope.milestones = [
                "Hire Date",
                "Termination Date"
            ];

            $scope.task = {
                name: null,
                description: null,
                categoryId: null,
                assignee: null,
                interval: null,
                value: null,
                isBefore: null,
                milestone: null
            };

            $scope.isDueDateChosen = function () {
                return $scope.task.interval != null &&
                       $scope.task.value != null &&
                       $scope.task.isBefore != null &&
                       $scope.task.milestone != null;
            };

            $scope.attachments = [];
            $scope.actions = [];

            $scope.dueDate = undefined;

            $scope.selectedMilestone = undefined;
            //$scope.milestone = { selectedOption: undefined };
            //$scope.$watch('milestone', function (value) {
            //    if (!value.selectedOption) return;

            //    $scope.selectedMilestone = _.find($scope.task.milestones, function (item) {
            //        return item.id == value.selectedOption;
            //    });

            //    console.log('selectedMilestone', $scope.selectedMilestone);
            //}, true);

            //$scope.dueDateHumanize = function () {
            //    if (!$scope.dueDate || !$scope.selectedMilestone) return undefined;

            //    var start = moment($scope.selectedMilestone.date);
            //    var end = moment($scope.dueDate);

            //    return end.from(start);
            //};

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
                $scope.task.dueDate = serviceTask.getDueDateFromMilestone('2013-05-02', $scope.task);
                $scope.task.employeeId = '8';
                $scope.task.principalType = 1;
                $scope.task.principalId = '2';

                serviceTask.save($scope.task, function (id) {
                    alert(id);

                    toastr.success('Saved.');
                });
            };

            $scope.cancel = function () {
                window.history.back();
            };

        }]);