Application.Filters.filter('customSort', function () {
    return function (items, strategy) {

        // implement correct sorting here

        var arr = [];

        switch (strategy) {
            case 'az':
                // sort alphabetically ascending

                arr = _.sortBy(items, 'name');

                break;
            case 'za':
                arr = _.sortBy(items, 'name').reverse();

                break;
        }
        return arr;

    };
});

Application.Filters.filter('employeeFilter', function () {
    return function (items, filter) {
        return _.filter(items, function (item) {

            // Status and Assigned To
            if (!_.some(item.tasks, function (task) {

                if (!checkValue(filter.status, task.status)) return false;
                if (!checkValue(filter.assignedTo, task.assignedTo)) return false;

                return true;

            })) return false;

            // Team
            // TODO: We have to decide what should this filter do

            // Department
            if (!checkValue(filter.department, item.departmentId)) return false;

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

Application.Filters.filter('taskFilter', function () {
    return function (items, filter) {
        return _.filter(items, function (item) {
            if (filter.status && !checkStatus(item, filter.status)) return false;

            if (filter.assignees.length > 0 &&
                !_.contains(filter.assignees, item.assignee)) return false;

            if (filter.period &&
                moment()[filter.period]() != moment(item.due)[filter.period]()) return false;

            return true;
        });
    };

    //
    // Helpers

    function checkStatus(task, status) {
        var isOverdue = moment(task.due).diff(moment(), 'days') < 0;

        switch (status) {
            case 'closed':
                return task.isDone;
            case 'overdue':
                return !task.isDone && isOverdue;
            case 'open':
                return !task.isDone && !isOverdue;
            default:
                return !task.isDone;
        }
    }
});

Application.Filters.filter('taskInCategoryFilter', function () {
    return function (items, categoryId) {
        return _.filter(items, function (item) {
            return item.categoryId == categoryId;
        });
    };
});

Application.Filters.filter('searchFilter', function () {
    return function (items, propName, query) {
        if (!query) return items;

        return _.filter(items, function (item) {
            return item[propName].toUpperCase().indexOf(query.toUpperCase()) !== -1;
        });
    };
});


// Skip filter used for paging, there is already limitTo in angular
Application.Filters.filter('skip', function () {
    return function (input, start) {
        start = parseInt(start);
        return input.slice(start);
    };
});
