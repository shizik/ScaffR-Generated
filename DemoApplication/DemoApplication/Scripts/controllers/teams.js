'use strict';

Application.Controllers.controller('ctrlTeamsIndex',
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

Application.Controllers.controller('ctrlTeamsDetail',
            ['$scope', '$routeParams', 'teams', 'commonUtils', 'toastr',
    function ($scope, $routeParams, teams, commonUtils, toastr) {

        $scope.isEdit = $routeParams.id == 0;

        $scope.switchMode = function () {
            $scope.isEdit = !$scope.isEdit;
        }

        $scope.$parent.backLinkText = 'Dashboard';

        $scope.team = { tasks: [] };

        teams.individual(function (data) {
            if ($routeParams.id == 0) {
                $scope.team = {
                    name: '',
                    description: '',
                    activity: [],
                    members: [],
                    tasks: []
                }
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

        $scope.switchMode = function () {
            $scope.isEdit = !$scope.isEdit;
        }

        $scope.saveChanges = function () {
            toastr.success('Saved.');
            $scope.isEdit = false;
        }

        $scope.goBack = function () {
            window.history.back();
        }
    }]);