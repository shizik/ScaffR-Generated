Application.Controllers.controller('teams.detail',
            ['$scope', '$location', '$routeParams', 'service.team', 'commonUtils', 'toastr',
    function ($scope, $location, $routeParams, serviceTeam, commonUtils, toastr) {
        $scope.isEdit = false;
        $scope.isNew = false;
        $scope.$parent.backLinkText = 'Dashboard';

        if ($routeParams.id == 'new') {
            $scope.isEdit = true;
            $scope.isNew = true;
            $scope.team = {
                id: '',
                name: '',
                description: '',
                activity: [],
                members: [],
                tasks: []
            };
        } else {
            serviceTeam.getById($routeParams.id, function (data) {
                $scope.team = data;

                commonUtils.setCounts($scope.team);
            });
        }

        //serviceTeam.individual(function (data) {


        //    commonUtils.setCounts($scope.team);

        //    $scope.departments = data.departments;
        //});

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
            if (!newValue || newValue.length == 0) return;

            var result = [];
            _.forEach($scope.periods, function (item) {
                item.count = 0;
            });

            _.forEach(newValue, function (item) {

                // Handle period counts
                _.forEach($scope.periods, function (period) {
                    if (moment()[period.func]() != moment(item.dueDate)[period.func]()) return;

                    period.count += 1;
                });

                // Handle assignees counts
                var assignee = _.findWhere(result, { id: item.principalId });
                if (assignee) {
                    assignee.count += 1;
                    return;
                }

                result.push({ id: item.principalId, name: item.principalName, count: 1 });
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

        var teamClone = {};
        $scope.editMode = function () {
            $scope.isEdit = true;
            cloneTeam($scope.team, teamClone);
        };

        $scope.saveChanges = function () {
            cloneTeam($scope.team, teamClone);

            if (teamClone.id == '')
                serviceTeam.add(teamClone, function (id) {
                    //HACK: The returned string has double double-quotes
                    $location.path('/teams/detail/' + id.substring(1, id.length - 1));
                    toastr.success('Saved');
                });
            else
                serviceTeam.update(teamClone, function () {
                    $scope.isEdit = false;
                    toastr.success('Updated');
                });
        };

        $scope.cancel = function () {
            $scope.isEdit = false;
            cloneTeam(teamClone, $scope.team);
        };

        function cloneTeam(input, output) {
            output.id = input.id;
            output.name = input.name;
            output.description = input.description;
        }
    }]);