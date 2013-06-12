Application.Controllers.controller('templates.detail',
            ['$scope', '$location', '$routeParams', 'service.template', 'service.task', 'service.principal', 'service.department', 'service.position', 'service.category', 'service.milestone', 'commonUtils', 'toastr',
    function ($scope, $location, $routeParams, serviceTemplate, serviceTask, servicePrincipal, serviceDepartment, servicePosition, serviceCategory, serviceMilestone, commonUtils, toastr) {
        $scope.isEdit = false;
        $scope.isNew = false;
        $scope.$parent.backLinkText = 'Dashboard';

        servicePrincipal.getAll(function (data) {
            $scope.assignables = data;

            if ($routeParams.id == 'new') {
                $scope.isEdit = true;
                $scope.isNew = true;
                $scope.template = {
                    id: 0,
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
        });

        serviceDepartment.getAll(function (data) {
            $scope.departments = data;
        });

        servicePosition.getAll(function (data) {
            $scope.positions = data;
        });

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

        serviceTask.getAvailable(function (data) {
            $scope.availableTasks = data;
        });

        $scope.loadActivity = function () {
            if ($routeParams.id == 'new') return;

            serviceTemplate.getActivity($routeParams.id, function (data) {
                $scope.activity = data;
            });
        };

        //
        // Filtering

        $scope.filter = {
            assignees: [],
            period: undefined
        };

        $scope.$watch('template.tasks', function (newValue) {
            if (!newValue || newValue.length == 0) return;

            commonUtils.setAssignees(newValue, $scope, true);
        }, true);

        //
        // Add new task

        $scope.isAddingTask = false;

        $scope.addNewTask = function (categoryId) {
            $scope.isAddingTask = true;

            var task = serviceTask.getEmpty();
            task.templateId = $scope.template.id;
            task.categoryId = categoryId;

            $scope.newTasks[categoryId].push(task);
        };

        $scope.saveTask = function (task) {
            serviceTask.add(task, function (id) {
                $scope.deleteTask(task, true);

                task.id = id;
                $scope.template.tasks.push(task);

                toastr.success("New Task Added");
            });
        };

        $scope.deleteTask = function (task, isNew) {
            if (isNew) {
                commonUtils.removeFromList(task, $scope.newTasks[task.categoryId]);
                $scope.isAddingTask = false;
            } else {
                serviceTask.delete(task.id, function () {
                    commonUtils.removeFromList(task, $scope.template.tasks);
                    toastr.success('Deleted.');
                });
            }
        };

        //
        // Template Assignables

        $scope.setApplicable = function (item, action, list) {
            if (item == null)
                serviceTemplate['addAll' + action]($scope.template.id, function (data) {
                    list.length = 0;
                    _.forEach(data, function (x) {
                        list.push(x);
                    });
                });
            else
                serviceTemplate['add' + action]($scope.template.id, item.id, function () {
                    list.push(item);
                });
        };

        $scope.removeApplicable = function (item, action, list) {
            serviceTemplate['delete' + action]($scope.template.id, item.id, function () {
                commonUtils.removeFromList(item, list);
            });
        };

        $scope.applyTo = function (item, action) {
            serviceTemplate['applyTo' + action]($scope.template.id, item.id, function () {
                toastr.success('Applied Successfully');
                item.isApplied = true;
            });
        };

        //
        // Global Actions

        var templateClone = {};
        $scope.editMode = function () {
            $scope.isEdit = true;
            cloneTemplate($scope.template, templateClone);
        };

        $scope.saveChanges = function () {
            cloneTemplate($scope.template, templateClone);

            if (templateClone.id == 0)
                serviceTemplate.add(templateClone, function (id) {
                    $location.path('/templates/detail/' + id);
                    toastr.success('Saved');
                });
            else
                serviceTemplate.update(templateClone, function () {
                    $scope.isEdit = false;
                    toastr.success('Updated');
                });
        };

        $scope.cancel = function () {
            $scope.isEdit = false;
            cloneTemplate(templateClone, $scope.template);
        };

        function cloneTemplate(input, output) {
            output.id = input.id;
            output.name = input.name;
            output.description = input.description;
        }
    }]);