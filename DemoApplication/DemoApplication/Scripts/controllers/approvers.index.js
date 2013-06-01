Application.Controllers.controller('approvers.index',
                ['$scope', '$location', 'service.approver', 'commonUtils', 'toastr',
        function ($scope, $location, serviceApprover, commonUtils, toastr) {
            $scope.$parent.backLinkText = undefined;

            $scope.filter = {
                status: undefined,
                assignedTo: undefined,
                team: undefined,
                department: undefined
            };

            $scope.goToDetails = function (employee) {
                $location.path('/approvers/' + employee.id);
            };

            serviceApprover.getBrief(function (data) {
                $scope.employees = data.approvers;
                $scope.departments = data.departments;
                $scope.statuses = commonUtils.setStatuses($scope.employees);
            });
        }]);