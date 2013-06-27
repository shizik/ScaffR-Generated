NetGuide.Controllers.controller('employees.mytasks',
            ['$scope', '$routeParams', 'service.approver', 'service.assignment', 'service.category', 'utils.common',
    function ($scope, $routeParams, serviceApprover, serviceAssignment, serviceCategory, commonUtils) {

        $scope.view = 'myTasks';

        serviceCategory.getAll(function (data) {
            $scope.categories = data;
        });

        serviceApprover.getMyTasks(function (data) {
            $scope.person = data;

            $scope.filteredTasks = filterTasks();
        });

        //
        // Filtering

        $scope.counts = {};
        $scope.filter = {
            status: 'all',
            assignees: [],
            period: undefined
        };

        $scope.$watch('view', function() {
            $scope.filteredTasks = filterTasks();
        });

        $scope.$watch('filteredTasks', function (newValue) {
            if (!newValue || newValue.length == 0) return;

            commonUtils.setCounts($scope.counts, newValue);
            commonUtils.setPeriods(newValue, $scope);
            commonUtils.setAssignees(newValue, $scope, false);
        }, true);

        $scope.tasks = function () {
        };

        //
        // Individual task view

        var prevView = undefined;
        $scope.activeTaskId = undefined;
        $scope.showTask = function (task) {
            $scope.activeTaskId = task.id;
            prevView = $scope.view;
            $scope.view = 'detail';
        };

        $scope.backToList = function () {
            $scope.activeTaskId = undefined;
            $scope.view = prevView;
        };

        function filterTasks() {
            if (!$scope.person) return [];

            if ($scope.view == 'myTasks')
                return _.filter($scope.person.tasks, function (item) { return item.employeeId == $scope.person.id; });

            return _.filter($scope.person.tasks, function (item) { return item.employeeId != $scope.person.id; });
        }
    }]);