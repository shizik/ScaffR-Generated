Application.Utils.factory('employeeUtils', function () {
    return {
        getCounts: function (employee) {
            var result = {
                open: 0,
                closed: 0,
                overdue: 0,
                total: function () {
                    return result.open + result.closed + result.overdue;
                }
            };

            if (!employee) return result;

            _.forEach(employee.tasks, function (item) {
                if (item.isDone) {
                    result.closed++;
                    return;
                }

                // TODO: This should be centralized
                var isOverdue = moment(item.due).diff(moment(), 'days') < 0;
                if (isOverdue) result.overdue++;
                else result.open++;
            });

            return result;
        }
    };
});