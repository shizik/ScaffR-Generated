Application.Controllers.controller('employees.detail',
            ['$scope', '$routeParams', 'service.employee', 'service.task', 'service.template', 'service.principal', 'service.category', 'commonUtils',
    function ($scope, $routeParams, serviceEmployee, serviceTask, serviceTemplate, servicePrincipal, serviceCategory, commonUtils) {

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
        });

        serviceEmployee.getById($routeParams.id, function (data) {
            $scope.person = data;

            commonUtils.setCounts($scope.person);
        });

        //serviceEmployee.individual(function (data) {
        //    $scope.availableTasks = groupItems(data.availableTasks);
        //    $scope.assignables = groupItems(data.assignables, 'department');
        //    $scope.templates = data.templates;
        //});

        function groupItems(taskList, group) {
            group = group || 'category';

            var result = {
                categories: [],
                group: {}
            };

            _.forEach(taskList, function (item) {

                if (!result.group[item[group]]) {
                    result.group[item[group]] = [];
                    result.categories.push(item[group]);
                }

                result.group[item[group]].push(item);
            });

            return result;
        }

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
                    if (moment()[period.func]() != moment(item.due)[period.func]()) return;

                    period.count += 1;
                });

                // Handle assignees counts
                var assignee = _.findWhere(result, { name: item.assignee });
                if (assignee) {
                    assignee.count += 1;
                    return;
                }

                result.push({ name: item.assignee, count: 1 });
            });

            $scope.assignees = result;
        }, true);

        //
        // Add new task

        $scope.isAddingTask = false;

        $scope.addNewTask = function (category) {
            $scope.isAddingTask = true;

            $scope.newTasks[category].push(
                {
                    "name": null,
                    "categoryId": category,
                    "assignee": null,
                    "dueDate": null,
                    "isDone": false
                });
        };

        $scope.saveTask = function (task) {
            $scope.template.tasks.push(task);
            $scope.deleteTask(task, true);
        };

        $scope.deleteTask = function (task, isNew) {
            var list = isNew ? $scope.newTasks[task.categoryId] : $scope.template.tasks;
            commonUtils.removeFromList(task, list);
            $scope.isAddingTask = false;
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