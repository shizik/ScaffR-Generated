NetGuide.Controllers.controller('tasks.index',
                ['$scope', '$location', 'service.task', 'toastr',
        function ($scope, $location, serviceTask, toastr) {
            $scope.$parent.backLinkText = undefined;

            serviceTask.getBrief(function (data) {
                $scope.tasks = data;
            });

            $scope.goToDetails = function (task) {
                $location.path('/tasks/edit/').search('taskId', task.id);
            };
        }]);
