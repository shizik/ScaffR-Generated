Application.Controllers.controller('employees.detail',
            ['$scope', '$routeParams', 'service.employee', 'service.template', 'commonUtils',
    function ($scope, $routeParams, serviceEmployee, serviceTemplate, commonUtils) {

        $scope.view = 'tasks';
        $scope.$parent.backLinkText = 'Dashboard';

        serviceTemplate.getAll(function (data) {
            $scope.templates = data;
        });

        serviceEmployee.getById($routeParams.id, function (data) {
            $scope.person = data;

            commonUtils.setCounts($scope.person);
        });

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

                toastr.success(data + ' Tasks Were Added');
            });
        };
    }]);