Application.Controllers.controller('approvers.mytasks',
            ['$scope', '$routeParams', 'service.approver', 'service.assignment', 'service.category', 'commonUtils',
    function ($scope, $routeParams, serviceApprover, serviceAssignment, serviceCategory, commonUtils) {

        serviceCategory.getAll(function (data) {
            $scope.categories = data;
        });

        serviceApprover.getMyTasks(function (data) {
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

        $scope.assignees = [];
        $scope.periods = [
            { name: 'Today', func: 'dayOfYear', count: 0 },
            { name: 'This Week', func: 'week', count: 0 },
            { name: 'This Month', func: 'month', count: 0 }
        ];

        $scope.$watch('person.tasks', function (newValue) {
            if (!newValue || newValue.length == 0) return;

            commonUtils.setCounts($scope.person);

            var result = [];
            _.forEach($scope.periods, function (item) {
                item.count = 0;
            });

            _.forEach(newValue, function (item) {

                // Handle period counts
                _.forEach($scope.periods, function (period) {
                    if (moment()[period.func]() != moment(item.dueDate)[period.func]()) return;

                    period.count += 1;
                });

                // Handle assignees counts
                var assignee = _.findWhere(result, { id: item.employeeId });
                if (assignee) {
                    assignee.count += 1;
                    return;
                }

                result.push({ id: item.employeeId, name: item.employeeName, count: 1 });
            });

            $scope.assignees = result;
        }, true);

        //
        // Add new task

        $scope.saveTask = function (task) {
            serviceAssignment.add(task, function (id) {
                $scope.deleteTask(task, true);

                task.id = id;
                $scope.person.tasks.push(task);

                toastr.success("New Task Added");
            });
        };

        //
        // Individual task view

        $scope.listView = true;
        $scope.activeTask = undefined;

        $scope.showTask = function (task) {
            $scope.activeTask = task;
            $scope.listView = false;
        };

        $scope.backToList = function () {
            $scope.activeTask = undefined;
            $scope.listView = true;
        };
    }]);