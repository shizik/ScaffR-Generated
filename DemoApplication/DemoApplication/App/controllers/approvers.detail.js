NetGuide.Controllers.controller('approvers.detail',
            ['$scope', '$routeParams', 'service.approver', 'service.assignment', 'service.category', 'utils.common',
    function ($scope, $routeParams, serviceApprover, serviceAssignment, serviceCategory, commonUtils) {

        $scope.$parent.backLinkText = 'Dashboard';

        serviceCategory.getAll(function (data) {
            $scope.categories = data;
        });

        serviceApprover.getById($routeParams.id, function (data) {
            $scope.person = data;

            commonUtils.setCounts($scope.person);
        });

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