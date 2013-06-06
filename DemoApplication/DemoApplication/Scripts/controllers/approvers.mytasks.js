Application.Controllers.controller('approvers.mytasks',
            ['$scope', '$routeParams', 'service.approver', 'service.assignment', 'service.category', 'commonUtils',
    function ($scope, $routeParams, serviceApprover, serviceAssignment, serviceCategory, commonUtils) {

        serviceApprover.getMyTasks(function (data) {
            $scope.person = data;
        });

        //
        // Individual task view

        $scope.activeTaskId = undefined;
        $scope.showTask = function (task) {
            $scope.activeTaskId = task.id;
        };
        
        $scope.backToList = function () {
            $scope.activeTaskId = undefined;
        };
    }]);