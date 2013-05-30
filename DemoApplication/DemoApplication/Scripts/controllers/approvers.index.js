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

            $scope.statuses = [
                {
                    "status": "open",
                    "count": 0
                },
                {
                    "status": "closed",
                    "count": 0
                },
                {
                    "status": "overdue",
                    "count": 0
                }
            ];

            $scope.goToDetails = function (employee) {
                $location.path('/approvers/' + employee.id);
            };

            serviceApprover.getBrief(function (data) {
                $scope.employees = data;

                _.forEach($scope.employees, function (item) {
                    $scope.statuses[0].count += item.open;
                    $scope.statuses[1].count += item.closed;
                    $scope.statuses[2].count += item.overdue;

                    item.total = item.open + item.overdue;
                });

            });

            //serviceEmployee.summaryOld(function (data) {
            //    $scope.assignables = data.assignables;
            //    $scope.departments = data.departments;
            //    $scope.teams = getTeamSummary(data.assignables);
            //});

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