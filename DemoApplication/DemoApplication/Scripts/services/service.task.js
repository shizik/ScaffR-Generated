Application.Services.factory('service.task', ['$http', function ($http) {
    return {
        getDueDateFromMilestone: function (date, milestone) {
            var func = milestone.isBefore ? 'subtract' : 'add';
            debugger;
            return moment(date)[func](milestone.interval.toLowerCase(), milestone.value);
        },

        getAvailable: function (callback) {
            $http.get('/api/task/available').success(callback);
        },

        save: function (entity, callback) {
            $http.put('/api/assignment', entity).success(callback);
        },

        update: function (entity, callback) {
            $http.post('/api/assignment', entity).success(callback);
        }
    };
}]);