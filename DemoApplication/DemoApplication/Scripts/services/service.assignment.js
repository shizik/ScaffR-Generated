Application.Services.factory('service.assignment', ['$http', function ($http) {
    return {
        getEmpty: function (categoryId) {
            return {
                id: 0,
                name: null,
                description: null,
                dueDate: null,
                completedDate: null,
                isDone: null,
                principalId: null,
                principalIsTeam: null,
                resolvedByOne: null,
                employeeId: null,
                taskId: null,
                categoryId: categoryId
            };
        },

        getById: function (id, callback) {
            $http.get('/api/assignment/?id=' + id).success(callback);
        },

        add: function (entity, callback) {
            $http.put('/api/assignment', entity).success(callback);
        },

        addFromTask: function (entity, callback) {
            $http.put('/api/assignment/addFromTask', entity).success(callback);
        },

        update: function (entity, callback) {
            $http.post('/api/assignment', entity).success(callback);
        },

        delete: function (id, callback) {
            $http.delete('/api/assignment/?id=' + id).success(callback);
        }
    };
}]);