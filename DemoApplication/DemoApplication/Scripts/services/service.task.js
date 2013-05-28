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
                principalId: null
            };
        },

        getDueDateFromMilestone: function (date, milestone) {
            var func = milestone.isBefore ? 'subtract' : 'add';

            return moment(date)[func](milestone.interval.toLowerCase(), milestone.value);
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

        update: function (entity, callback) {
            $http.post('/api/task', entity).success(callback);
        },

        delete: function (id, callback) {
            $http.delete('/api/task/?id=' + id).success(callback);
        }
    };
}]);