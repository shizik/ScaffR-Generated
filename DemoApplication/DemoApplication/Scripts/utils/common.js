Application.Utils.factory('commonUtils', function () {
    return {
        setCounts: function (entity) {
            entity.open = 0;
            entity.overdue = 0;
            entity.pending = 0;
            entity.closed = 0;
            entity.total = 0;

            if (!entity.tasks || entity.tasks.length == 0) return;

            _.forEach(entity.tasks, function (item) {
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
                { "status": "closed", "count": 0 },
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

        removeFromList: function (item, list) {
            var index = _.indexOf(list, item);

            if (index < 0) return;

            list.splice(index, 1);
        }
    };
});