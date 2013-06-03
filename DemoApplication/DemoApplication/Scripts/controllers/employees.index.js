Application.Controllers.controller('employees.index',
                ['$scope', '$location', 'service.employee', 'commonUtils', 'toastr',
        function ($scope, $location, serviceEmployee, commonUtils, toastr) {
            $scope.$parent.backLinkText = undefined;

            $scope.filter = {
                status: undefined,
                assignedTo: undefined,
                team: undefined,
                department: undefined
            };

            $scope.goToDetails = function (employee) {
                $location.path('/employees/' + employee.id);
            };

            serviceEmployee.getBrief(function (data) {
                $scope.employees = data.employees;
                $scope.departments = data.departments;
                $scope.statuses = commonUtils.setStatuses($scope.employees);
            });
        }]);