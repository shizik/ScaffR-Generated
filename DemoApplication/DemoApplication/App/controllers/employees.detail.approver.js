NetGuide.Controllers.controller('employees.detail.approver',
            ['$scope', '$routeParams', 'service.approver', 'service.assignment', 'service.category', 'utils.common',
    function ($scope, $routeParams, serviceApprover, serviceAssignment, serviceCategory, commonUtils) {

        serviceCategory.getAll(function (data) {
            $scope.categories = data;
        });

        serviceApprover.getTasks($routeParams.id, function (data) {
            $scope.tasks = data;
        });

        //
        // Filtering

        $scope.counts = {};
        $scope.filter = {
            status: 'all',
            assignees: [],
            period: undefined
        };

        $scope.$watch('tasks', function (newValue) {
            if (!newValue || newValue.length == 0) return;

            commonUtils.setCounts($scope.counts, $scope.tasks);
            commonUtils.setPeriods(newValue, $scope);
            commonUtils.setAssignees(newValue, $scope, false);
        }, true);
    }]);