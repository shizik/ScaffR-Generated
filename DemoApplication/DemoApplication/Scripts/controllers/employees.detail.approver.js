Application.Controllers.controller('employees.detail.approver',
            ['$scope', '$routeParams', 'service.approver', 'service.assignment', 'service.category', 'commonUtils',
    function ($scope, $routeParams, serviceApprover, serviceAssignment, serviceCategory, commonUtils) {

        serviceCategory.getAll(function (data) {
            $scope.categories = data;
        });

        if ($routeParams.id)
            serviceApprover.getById($routeParams.id, handler);
        else
            serviceApprover.getMyTasks(handler);

        function handler(data) {
            $scope.person = data;

            commonUtils.setCounts($scope.person);
        }

        //
        // Filtering

        $scope.filter = {
            status: 'all',
            assignees: [],
            period: undefined
        };

        $scope.$watch('person.tasks', function (newValue) {
            if (!newValue || newValue.length == 0) return;

            commonUtils.setCounts($scope.person);
            commonUtils.setPeriods(newValue, $scope);
            commonUtils.setAssignees(newValue, $scope, false);
        }, true);
    }]);