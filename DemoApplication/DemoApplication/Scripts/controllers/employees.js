'use strict';

Application.Controllers.controller('ctrlEmployeesIndex',
                ['$scope', '$location', 'employees', 'employeeUtils', 'toastr',
        function ($scope, $location, employees, employeeUtils, toastr) {
            $scope.$parent.backLinkText = undefined;

            $scope.filter = {
                status: [],
                assignedTo: [],
                team: [],
                department: []
            };

            $scope.goToDetails = function (employee) {
                $location.path('/employees/' + employee.id);
            };

            employees.summary().then(function (data) {
                $scope.employees = data.results;
                $scope.$apply();
            }).fail(function (error) {
                console.log('error', error);
                toastr.error('An error occured while pulling the data.');
            });

            /*employee.summary(function (data) {
                $scope.employees = data.employees;
                $scope.assignables = [];// data.assignables;
                $scope.departments = [];//data.departments;
                $scope.summary = [];//data.summary;
                $scope.teams = getTeamSummary(data.assignables);
        
                _.forEach($scope.employees, function (person) {
                    person.counts = employeeUtils.getCounts(person);
        
                    person.latestDueDate = function () {
                        var due = undefined;
        
                        _.forEach(person.tasks, function (task) {
                            if (!due || task.due < due) due = task.due;
                        });
        
                        return due;
                    };
                });
            });*/

            function getTeamSummary(ass) {
                var summary = [];
                for (var i = 0; i < ass.length; i++) {
                    var assignable = ass[i];
                    if (assignable.type == 'team') {
                        summary.push(assignable);
                    }
                }
                return summary;
            }

            $scope.containsStatus = function (status) {
                return _.contains($scope.filter.status, status);
            };
        }]);

Application.Controllers.controller('ctrlEmployeesDetail',
            ['$scope', 'employees', 'commonUtils',
    function ($scope, employees, commonUtils) {

        $scope.$parent.backLinkText = 'Dashboard';

        $scope.person = { tasks: [] };

        employees.individual(function (data) {
            $scope.person = data;
            $scope.tasks = groupItems(data.tasks);
            $scope.availableTasks = groupItems(data.availableTasks);
            $scope.assignables = groupItems(data.assignables, 'department');
            $scope.templates = data.templates;

            var newTasks = {};
            _.forEach($scope.tasks.categories, function (item) {
                newTasks[item] = [];
            });

            $scope.newTasks = newTasks;
        });

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
            { name: 'Today', func: 'dayOfYear' },
            { name: 'This Week', func: 'week' },
            { name: 'This Month', func: 'month' }
        ];

        $scope.$watch('person.tasks', function (newValue) {
            if (newValue.length == 0) return;

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
                    "category": category,
                    "assignee": null,
                    "due": null,
                    "status": "open",
                    "isDone": false
                });
        };

        $scope.saveTask = function (task) {
            $scope.tasks.group[task.category].push(task);
            $scope.person.tasks.push(task);
            $scope.deleteTask(task, true);
        };

        $scope.deleteTask = function (task, isNew) {
            var category = task.category;
            var list = isNew ? $scope.newTasks : $scope.tasks.group;

            commonUtils.removeFromList(task, list[category]);
            if (!isNew)
                commonUtils.removeFromList(task, $scope.person.tasks);

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