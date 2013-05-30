Application.Controllers.controller('teams.index',
                ['$scope', '$location', 'service.team', 'toastr',
        function ($scope, $location, serviceTeam, toastr) {

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
            serviceTeam.getBrief(function (data) {
                $scope.teams = data;

                _.forEach($scope.teams, function (item) {
                    $scope.statuses[0].count += item.open;
                    $scope.statuses[1].count += item.closed;
                    $scope.statuses[2].count += item.overdue;

                    item.total = item.open + item.overdue;
                });

            });

            //teams.getSummary(function (data) {
            //    $scope.departments = data.departments;
            //});

            $scope.goToDetails = function (team) {
                $location.path('/teams/detail/' + team.id);
            };

            $scope.containsStatus = function (status) {
                return _.contains($scope.filter.status, status);
            };
        }]);