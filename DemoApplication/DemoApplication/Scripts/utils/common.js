Application.Utils.factory('commonUtils', function () {
    return {
        setCounts: function (entity) {
            entity.open = 0;
            entity.closed = 0;
            entity.overdue = 0;
            entity.total = 0;

            if (!entity.tasks || entity.tasks.length == 0) return;

            _.forEach(entity.tasks, function (item) {
                if (item.isDone) {
                    entity.closed++;
                    return;
                }

                // TODO: This should be centralized
                var isOverdue = moment(item.dueDate).diff(moment(), 'days') < 0;
                if (isOverdue) entity.overdue++;
                else entity.open++;
            });

            entity.total = entity.open + entity.closed + entity.overdue;
        },

        removeFromList: function (item, list) {
            var index = _.indexOf(list, item);

            if (index < 0) return;

            list.splice(index, 1);
        }
    };
});