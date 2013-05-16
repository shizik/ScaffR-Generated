'use strict';

Application.Controllers.controller('ctrlTeamsIndex',
                ['$scope', '$location', 'teams', 'toastr',
        function ($scope, $location, teams, toastr) {
            $scope.$parent.backLinkText = undefined;

            teams.summary().then(function (data) {
                $scope.teams = data.results;
                $scope.$apply();
            }).fail(function (error) {
                console.log('error', error);
                toastr.error('An error occured while pulling the data.');
            });

            $scope.filter = {
                status: [],
                assignedTo: [],
                team: [],
                department: []
            };

            $scope.goToDetails = function (team) {
                $location.path('/teams/' + team.id);
            };

            $scope.containsStatus = function (status) {
                return _.contains($scope.filter.status, status);
            };
        }]);

Application.Controllers.controller('ctrlTeamsDetail',
            ['$scope', 'teams', 'commonUtils',
    function ($scope, teams, commonUtils) {

        $scope.isEdit = false;

        $scope.switchMode = function () {
            $scope.isEdit = !$scope.isEdit;
        }

        $scope.$parent.backLinkText = 'Dashboard';

        $scope.team = { tasks: [] };

        teams.individual(function (data) {
            $scope.team = data;
            //$scope.tasks = groupItems(data.tasks);
            //$scope.availableTasks = groupItems(data.availableTasks);
            //$scope.assignables = groupItems(data.assignables, 'department');
            //$scope.templates = data.templates;
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

        $scope.newMembers = [];
        $scope.isAddingMember = false;
        $scope.addNewMember = function () {
            $scope.isAddingMember = true;

            $scope.newMembers.push(
                {
                    "name": null,
                    "category": category,
                    "assignee": null,
                    "due": null,
                    "status": "open",
                    "isDone": false
                });
        };

        $scope.saveTask = function (task) {
            $scope.team.members.push(task);
            $scope.deleteTask(task, true);
        };

        $scope.deleteTask = function (member, isNew) {
            var list = isNew ? $scope.newMembers : $scope.team.members;
            commonUtils.removeFromList(member, list);
            $scope.isAddingMember = false;
        };
    }]);