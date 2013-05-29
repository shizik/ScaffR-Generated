Application.Services.factory('service.task', ['$http', function ($http) {
    return {
        getEmpty: function () {
            return {
                id: 0,
                name: null,
                description: null,
                parentTaskId: null,
                milestoneId: null,
                milestoneValue: null,
                interval: null,
                isBefore: null,
                templateId: null,
                categoryId: null,
                resolvedByOne: false,
                principalIsTeam: false,
                principalId: null
            };
        },

        getDueDateFromMilestone: function (employeeId, task, callback) {
            $http.get('/api/employee/getMilestoneValue?id=' + employeeId + '&milestoneId=' + task.milestoneId).success(function (data) {
                var intervals = [undefined, "days", "weeks", "months", "quarters"];
                var func = task.isBefore ? 'subtract' : 'add';
                var date = moment(data)[func](intervals[task.interval], task.milestoneValue);
                callback(date._d);
            });
        },

        getById: function (id, callback) {
            $http.get('/api/task/?id=' + id).success(callback);
        },

        getAvailable: function (callback) {
            $http.get('/api/task/available').success(callback);
        },

        add: function (entity, callback) {
            $http.put('/api/task', entity).success(callback);
        },

        addInTemplate: function (entity, callback) {
            $http.post('/api/template/addtask', entity).success(callback);
        },

        update: function (entity, callback) {
            $http.post('/api/task', entity).success(callback);
        },

        delete: function (id, callback) {
            $http.delete('/api/task/?id=' + id).success(callback);
        }
    };
}]);