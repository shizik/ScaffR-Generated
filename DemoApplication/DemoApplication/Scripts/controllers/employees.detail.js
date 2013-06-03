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

        $scope.$watch('person.tasks', function (newValue) {
            if (!newValue || newValue.length == 0) return;

            commonUtils.setCounts($scope.person);
            commonUtils.setPeriods(newValue, $scope);
            commonUtils.setAssignees(newValue, $scope, true);
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
                    toastr.success('Deleted.');
                });
            }
        };

        //
        // Individual task view

        $scope.activeTaskId = undefined;
        $scope.showTask = function (task) {
            $scope.activeTaskId = task.id;
        };

        $scope.backToList = function () {
            $scope.activeTaskId = undefined;
        };

        //
        // Templates

        $scope.isTemplateApplied = function (id) {
            if (!$scope.person) return false;

            return _.contains($scope.person.appliedTemplates, id);
        };

        $scope.applyTemplate = function (template) {
            if ($scope.isTemplateApplied(template.id)) return;

            serviceTemplate.apply(template.id, $scope.person.id, function (data) {
                serviceEmployee.getById($routeParams.id, function (data) {
                    $scope.person = data;

                    commonUtils.setCounts($scope.person);
                });

                toastr.success(data + 'Tasks Were Added');
            });
        };
    }]);