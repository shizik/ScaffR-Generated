Application.Controllers.controller('teams.index',
                ['$scope', '$location', 'service.team', 'commonUtils', 'toastr',
        function ($scope, $location, serviceTeam, commonUtils, toastr) {

            $scope.$parent.backLinkText = undefined;

            $scope.filter = {
                status: undefined,
                assignedTo: undefined,
                team: undefined,
                department: undefined
            };

            serviceTeam.getBrief(function (data) {
                $scope.teams = data;
                $scope.statuses = commonUtils.setStatuses($scope.teams);
            });

            $scope.goToDetails = function (team) {
                $location.path('/teams/detail/' + team.id);
            };
        }]);