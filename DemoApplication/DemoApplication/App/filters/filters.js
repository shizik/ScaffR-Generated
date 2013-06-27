NetGuide.Filters.filter('employeeFilter', function () {
    return function (items, filter) {
        return _.filter(items, function (item) {

            // Status
            if (filter.status && item[filter.status] == 0) return false;

            // Status and Assigned To
            //if (!_.some(item.tasks, function (task) {

            //    if (!checkValue(filter.assignedTo, task.assignedTo)) return false;

            //    return true;

            //})) return false;

            // Team
            // TODO: We have to decide what should this filter do

            // Department
            if (filter.department && filter.department != item.departmentId) return false;

            // If all checks passed this should be rendered
            return true;
        });
    };

    //
    // Helpers

    function checkValue(list, value) {
        return !list || list.length == 0 || _.contains(list, value);
    }
});

NetGuide.Filters.filter('taskFilter', function () {
    return function (items, filter) {
        return _.filter(items, function (item) {
            var id = item.principalId || item.employeeId;

            if (filter.status && !checkStatus(item, filter.status)) return false;

            if (filter.assignees.length > 0 &&
                !_.contains(filter.assignees, id)) return false;

            if (filter.period &&
                moment()[filter.period]() != moment(item.dueDate)[filter.period]()) return false;

            return true;
        });
    };

    //
    // Helpers

    function checkStatus(task, status) {
        var isOverdue = moment(task.dueDate).diff(moment(), 'days') < 0;

        switch (status) {
            case 'closed':
                return task.status == 3;
            case 'pending':
                return task.status == 2;
            case 'overdue':
                return task.status == 1 && isOverdue;
            case 'open':
                return task.status == 1 && !isOverdue;
            default:
                return task.status < 3;
        }
    }
});

NetGuide.Filters.filter('taskInCategoryFilter', function () {
    return function (items, categoryId) {
        return _.filter(items, function (item) {
            return item.categoryId == categoryId;
        });
    };
});

NetGuide.Filters.filter('employeeInDepartment', function () {
    return function (items, departmentId) {
        return _.filter(items, function (item) {
            return item.departmentId == departmentId;
        });
    };
});

NetGuide.Filters.filter('searchFilter', function () {
    return function (items, propName, query) {
        if (!query) return items;

        return _.filter(items, function (item) {
            return item[propName].toUpperCase().indexOf(query.toUpperCase()) !== -1;
        });
    };
});

NetGuide.Filters.filter('conditional', function () {
    return function (items, propName, value) {
        if (!value) return items;

        return _.filter(items, function (item) {
            return item[propName] == value;
        });
    };
});

// Skip filter used for paging, there is already limitTo in angular
NetGuide.Filters.filter('skip', function () {
    return function (input, start) {
        start = parseInt(start);
        return input.slice(start);
    };
});
