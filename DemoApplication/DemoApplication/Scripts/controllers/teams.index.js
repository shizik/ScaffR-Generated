Application.Controllers.controller('teams.index',
                ['$scope', '$location', 'teams', 'toastr',
        function ($scope, $location, teams, toastr) {

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

            teams.summary().then(function (data) {
                $scope.teams = data.results;

                _.forEach($scope.teams, function (item) {
                    $scope.statuses[0].count += item.open;
                    $scope.statuses[1].count += item.closed;
                    $scope.statuses[2].count += item.overdue;
                });

                $scope.$apply();
            }).fail(function (error) {
                console.log('error', error);
                toastr.error('An error occured while pulling the data.');
            });

            teams.getSummary(function (data) {
                $scope.departments = data.departments;
            });

            $scope.goToDetails = function (team) {
                $location.path('/teams/' + team.id);
            };

            $scope.containsStatus = function (status) {
                return _.contains($scope.filter.status, status);
            };
        }]);