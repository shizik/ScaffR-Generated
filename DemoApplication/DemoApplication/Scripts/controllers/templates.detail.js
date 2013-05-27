Application.Controllers.controller('templates.detail',
            ['$scope', '$routeParams', 'service.template', 'service.task', 'service.principal', 'service.category', 'service.milestone', 'commonUtils', 'toastr',
    function ($scope, $routeParams, serviceTemplate, serviceTask, servicePrincipal, serviceCategory, serviceMilestone, commonUtils, toastr) {

        $scope.isEdit = $routeParams.id == 0;

        $scope.$parent.backLinkText = 'Dashboard';

        serviceCategory.getAll(function (data) {
            $scope.categories = data;

            var newTasks = {};
            _.forEach($scope.categories, function (item) {
                newTasks[item.id] = [];
            });

            $scope.newTasks = newTasks;
        });

        serviceMilestone.getAll(function (data) {
            $scope.milestones = data;
        });

        servicePrincipal.getAll(function (data) {
            $scope.assignables = data;
        });

        serviceTask.getAvailable(function (data) {
            $scope.availableTasks = data;
        });

        if ($routeParams.id == 0) {
            $scope.template = {
                name: '',
                description: '',
                activity: [],
                tasks: []
            };
        } else {
            serviceTemplate.getById($routeParams.id, function (data) {
                $scope.template = data;
            });
        }

        //templates.individual(function (data) {

        //    $scope.availableTasks = groupItems(data.availableTasks, 'categoryId');
        //    $scope.assignables = groupItems(data.assignables, 'department');
        //    $scope.milestones = data.milestones;
        //    $scope.templateAssignables = groupItems(data.templateAssignables, 'department');

        //    console.log('milestones', $scope.milestones);
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
            if (!newValue || newValue.length == 0) return;

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

        $scope.addNewTask = function (categoryId) {
            $scope.isAddingTask = true;

            $scope.newTasks[categoryId].push(
                {
                    "name": null,
                    "categoryId": categoryId,
                    "principalId": null,
                    "interval": null,
                    "value": null,
                    "isBefore": null,
                    "milestone": null,
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
        // Template Assignables

        $scope.templateAppliesTo = [];
        $scope.setTemplateAssignable = function (assignable) {
            $scope.templateAppliesTo.push(assignable);
        };

        $scope.removeTemplateAssignable = function (index) {
            $scope.templateAppliesTo.splice(index, 1);
        };

        //
        // Global Actions

        $scope.switchMode = function () {
            $scope.isEdit = !$scope.isEdit;
        };

        $scope.saveChanges = function () {
            toastr.success('Saved.');
            $scope.isEdit = false;
        };

        $scope.goBack = function () {
            window.history.back();
        };

    }]);