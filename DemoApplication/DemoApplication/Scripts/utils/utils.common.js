Application.Utils.factory('utils.common', function () {
    return {
        setCounts: function (entity, tasks) {
            entity.open = 0;
            entity.overdue = 0;
            entity.pending = 0;
            entity.closed = 0;
            entity.total = 0;

            if (!tasks || tasks.length == 0) return;

            _.forEach(tasks, function (item) {
                if (item.status == 3) {
                    entity.closed++;
                    return;
                }
                else if (item.status == 2) {
                    entity.pending++;
                    return;
                }

                // TODO: This should be centralized
                var isOverdue = moment(item.dueDate).diff(moment(), 'days') < 0;
                if (isOverdue) entity.overdue++;
                else entity.open++;
            });

            entity.total = entity.open + entity.overdue + entity.pending + entity.closed;
        },

        setStatuses: function (items) {
            var statuses = [
                { "status": "open", "count": 0 },
                { "status": "overdue", "count": 0 },
                { "status": "pending", "count": 0 },
                { "status": "closed", "count": 0 }
            ];

            _.forEach(items, function (item) {
                statuses[0].count += item.open;
                statuses[1].count += item.overdue;
                statuses[2].count += item.pending;
                statuses[3].count += item.closed;

                item.total = item.open + item.overdue + item.pending;
            });

            return statuses;
        },

        setPeriods: function (tasks, $scope) {
            if (!$scope.periods) {
                $scope.periods = [
                    { name: 'Today', func: 'dayOfYear', count: 0 },
                    { name: 'This Week', func: 'week', count: 0 },
                    { name: 'This Month', func: 'month', count: 0 }
                ];
            }

            _.forEach($scope.periods, function (item) {
                item.count = 0;
            });

            _.forEach(tasks, function (item) {
                _.forEach($scope.periods, function (period) {
                    if (moment()[period.func]() != moment(item.dueDate)[period.func]()) return;

                    period.count += 1;
                });
            });
        },

        setAssignees: function (tasks, $scope, useExternal) {
            var result = [];

            _.forEach(tasks, function (item) {

                if (useExternal && (!$scope.assignables || $scope.assignables.length == 0)) return;

                var prefix = item.principalId ? 'principal' : 'employee',
                    id = item.principalId || item.employeeId;

                // Handle assignees counts
                var assignee = _.findWhere(result, { id: id });
                if (assignee) {
                    assignee.count += 1;
                    return;
                }

                if (!useExternal) {
                    result.push({ id: id, name: item[prefix + 'Name'], count: 1 });
                    return;
                }

                var principal = _.find($scope.assignables, function (p) { return p.id == id; });
                if (!principal) return;

                result.push({ id: id, name: principal.name, count: 1 });
            });

            $scope.assignees = result;
        },

        removeFromList: function (item, list) {
            var index = _.indexOf(list, item);

            if (index < 0) return;

            list.splice(index, 1);
        }
    };
});