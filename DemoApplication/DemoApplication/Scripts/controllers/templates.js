'use strict';

Application.Controllers.controller('ctrlTemplatesIndex',
                ['$scope', '$location', 'templates', 'toastr',
        function ($scope, $location, templates, toastr) {
            $scope.$parent.backLinkText = undefined;

            templates.summary().then(function (data) {
                $scope.templates = data.results;
                $scope.$apply();
            }).fail(function (error) {
                console.log('error', error);
                toastr.error('An error occured while pulling the data.');
            });

            $scope.filter = {
                status: [],
                assignedTo: [],
                team: [],
                department: []
            };

            $scope.goToDetails = function (template) {
                $location.path('/templates/' + template.id);
            };

            $scope.containsStatus = function (status) {
                return _.contains($scope.filter.status, status);
            };

        }]);

Application.Controllers.controller('ctrlTemplatesDetail',
            ['$scope', 'templates', 'categories', 'commonUtils',
    function ($scope, templates, categories, commonUtils) {

        $scope.isEdit = false;

        $scope.switchMode = function () {
            $scope.isEdit = !$scope.isEdit;
        }

        $scope.$parent.backLinkText = 'Dashboard';

        $scope.template = { tasks: [] };

        categories.list(function (data) {
            $scope.categories = data;

            var newTasks = {};
            _.forEach($scope.categories, function (item) {
                newTasks[item.id] = [];
            });
            $scope.newTasks = newTasks;
        });

        templates.individual(function (data) {
            $scope.template = data;
            $scope.availableTasks = groupItems(data.availableTasks, 'categoryId');
            $scope.assignables = groupItems(data.assignables, 'department');
            $scope.milestones = data.milestones;
            $scope.templateAssignables = groupItems(data.templateAssignables, 'department');

            console.log('milestones', $scope.milestones);
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
            assignees: [],
            period: undefined
        };

        $scope.assignees = [];
        $scope.periods = [
            { name: 'Today', func: 'dayOfYear' },
            { name: 'This Week', func: 'week' },
            { name: 'This Month', func: 'month' }
        ];

        $scope.$watch('template.tasks', function (newValue) {
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

        $scope.addNewTask = function (categoryId) {
            $scope.isAddingTask = true;

            $scope.newTasks[categoryId].push(
                {
                    "name": null,
                    "categoryId": categoryId,
                    "assignee": null,
                    "due": null,
                    "templateId": $scope.template.id
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
        // Template Assignables

        $scope.templateAppliesTo = [];
        $scope.setTemplateAssignable = function (assignable) {
            $scope.templateAppliesTo.push(assignable);
        };

        $scope.removeTemplateAssignable = function (index) {
            $scope.templateAppliesTo.splice(index, 1);
        };
    }]);