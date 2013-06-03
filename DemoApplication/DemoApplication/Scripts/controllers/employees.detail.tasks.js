Application.Controllers.controller('employees.detail.tasks',
            ['$scope', '$routeParams', 'service.employee', 'service.task', 'service.assignment', 'service.template', 'service.principal', 'service.category', 'commonUtils',
    function ($scope, $routeParams, serviceEmployee, serviceTask, serviceAssignment, serviceTemplate, servicePrincipal, serviceCategory, commonUtils) {

        serviceCategory.getAll(function (data) {
            $scope.categories = data;

            var newTasks = {};
            _.forEach($scope.categories, function (item) {
                newTasks[item.id] = [];
            });

            $scope.newTasks = newTasks;
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
    }]);