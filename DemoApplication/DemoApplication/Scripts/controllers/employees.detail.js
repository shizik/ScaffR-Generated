Application.Controllers.controller('employees.detail',
            ['$scope', '$routeParams', 'service.employee', 'service.task', 'service.assignment', 'service.template', 'service.principal', 'service.category', 'commonUtils',
    function ($scope, $routeParams, serviceEmployee, serviceTask, serviceAssignment, serviceTemplate, servicePrincipal, serviceCategory, commonUtils) {

        $scope.$parent.backLinkText = 'Dashboard';

        serviceCategory.getAll(function (data) {
            $scope.categories = data;

            var newTasks = {};
            _.forEach($scope.categories, function (item) {
                newTasks[item.id] = [];
            });

            $scope.newTasks = newTasks;
        });

        serviceTemplate.getAll(function (data) {
            $scope.templates = data;
        });

        serviceTask.getAvailable(function (data) {
            $scope.availableTasks = data;
        });

        servicePrincipal.getAll(function (data) {
            $scope.assignables = data;

            serviceEmployee.getById($routeParams.id, function (data) {
                $scope.person = data;

                commonUtils.setCounts($scope.person);
            });
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

                if (!$scope.assignables || $scope.assignables.length == 0) return;

                // Handle assignees counts
                var assignee = _.findWhere(result, { id: item.principalId });
                if (assignee) {
                    assignee.count += 1;
                    return;
                }

                var principal = _.find($scope.assignables, function (p) { return p.id == item.principalId; });
                result.push({ id: principal.id, name: principal.name, count: 1 });
            });

            $scope.assignees = result;
        }, true);

        //
        // Add new task

        $scope.isAddingTask = false;

        $scope.addNewTask = function (category) {
            $scope.isAddingTask = true;

            $scope.newTasks[category].push(serviceAssignment.getEmpty(category));
        };

        $scope.saveTask = function (task) {
            serviceAssignment.add(task, function (id) {
                $scope.deleteTask(task, true);

                task.id = id;
                $scope.person.tasks.push(task);

                toastr.success("New Task Added");
            });
        };

        $scope.deleteTask = function (task, isNew) {
            if (isNew) {
                commonUtils.removeFromList(task, $scope.newTasks[task.categoryId]);
                $scope.isAddingTask = false;
            } else {
                serviceAssignment.delete(task.id, function () {
                    commonUtils.removeFromList(task, $scope.person.tasks);
                    $scope.isAddingTask = false;

                    toastr.success('Deleted.');
                });
            }
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

        //
        // Templates

        $scope.applyTemplate = function (template) {
            if (template.isApplied) return;

            _.forEach(template.assignments, function (item) {
                $scope.saveTask(item);
            });

            template.isApplied = true;
        };
    }]);