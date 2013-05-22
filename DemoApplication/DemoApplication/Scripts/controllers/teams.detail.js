Application.Controllers.controller('teams.detail',
            ['$scope', '$routeParams', 'service.team', 'commonUtils', 'toastr',
    function ($scope, $routeParams, serviceTeam, commonUtils, toastr) {

        $scope.isEdit = $routeParams.id == 0;

        $scope.switchMode = function() {
            $scope.isEdit = !$scope.isEdit;
        };

        $scope.$parent.backLinkText = 'Dashboard';

        $scope.team = { tasks: [] };

        serviceTeam.individual(function (data) {
            if ($routeParams.id == 0) {
                $scope.team = {
                    name: '',
                    description: '',
                    activity: [],
                    members: [],
                    tasks: []
                };
            }
            else
                $scope.team = data;

            commonUtils.setCounts($scope.team);

            $scope.departments = data.departments;
        });

        //
        // Filtering

        $scope.filter = {
            status: 'all',
            assignees: [],
            period: undefined
        };

        $scope.assignees = [];
        $scope.periods = [
            { name: 'Today', func: 'dayOfYear' },
            { name: 'This Week', func: 'week' },
            { name: 'This Month', func: 'month' }
        ];

        $scope.$watch('team.tasks', function (newValue) {
            if (newValue.length == 0) return;

            var result = [];
            _.forEach($scope.periods, function (item) {
                item.count = 0;
            });

            _.forEach(newValue, function (item) {

                // Handle period counts
                _.forEach($scope.periods, function (period) {
                    if (moment()[period.func]() != moment(item.due)[period.func]()) return;

                    period.count += 1;
                });

                // Handle assignees counts
                var assignee = _.findWhere(result, { name: item.assignee });
                if (assignee) {
                    assignee.count += 1;
                    return;
                }

                result.push({ name: item.assignee, count: 1 });
            });

            $scope.assignees = result;
        }, true);

        //
        // Add new member

        $scope.addMember = function (item, isTeam) {
            if (isTeam) {
                _.forEach(item.people, function (p) {
                    p.isActive = true;
                    $scope.team.members.push(p);
                });
            }
            else {
                item.isActive = true;
                $scope.team.members.push(item);
            }
        };

        $scope.deleteMember = function (index) {
            $scope.team.members.splice(index, 1);
        };

        //
        // Global Actions

        $scope.switchMode = function() {
            $scope.isEdit = !$scope.isEdit;
        };

        $scope.saveChanges = function() {
            toastr.success('Saved.');
            $scope.isEdit = false;
        };

        $scope.goBack = function() {
            window.history.back();
        };
    }]);