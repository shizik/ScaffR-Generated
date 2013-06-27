Application.Controllers.controller('teams.detail',
            ['$scope', '$location', '$routeParams', 'service.team', 'utils.common', 'toastr',
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

                commonUtils.setCounts($scope.team, $scope.team.tasks);
            });

            serviceTeam.getAvailableMembers($routeParams.id, function (data) {
                $scope.departments = data.departments;
                $scope.teams = data.teams;
                $scope.employees = data.employees;
                $scope.admins = data.admins;
            });
        }

        $scope.loadActivity = function () {
            if ($routeParams.id == 'new') return;

            serviceTeam.getActivity($routeParams.id, function (data) {
                $scope.activity = data;
            });
        };

        //
        // Filtering

        $scope.filter = {
            status: 'all',
            assignees: [],
            period: undefined
        };

        $scope.$watch('team.tasks', function (newValue) {
            if (!newValue || newValue.length == 0) return;

            commonUtils.setPeriods(newValue, $scope);
            commonUtils.setAssignees(newValue, $scope, false);
        }, true);

        //
        // Add new member

        $scope.addMember = function (item, isTeam) {
            var request = {
                id: $scope.team.id,
                principalId: item.id,
                isTeam: isTeam
            };

            serviceTeam.addMembers(request, function (data) {
                toastr.success('Members Added');
                $scope.team.members = data;
            });
        };

        $scope.deleteMember = function (member) {
            serviceTeam.deleteMember($scope.team.id, member.id, function () {
                commonUtils.removeFromList(member, $scope.team.members);
                toastr.success('Member Deleted');
            });
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