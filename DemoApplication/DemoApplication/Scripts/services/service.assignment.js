Application.Services.factory('service.assignment', ['$http', function ($http) {
    return {
        getEmpty: function (categoryId) {
            return {
                id: 0,
                name: null,
                description: null,

                status: 1,
                dueDate: null,
                completedDate: null,

                principalIsTeam: null,
                resolvedByOne: null,
                principalId: undefined,
                approverId: null,
                employeeId: null,

                requiresSignature: false,
                recurring: false,

                taskId: null,
                categoryId: categoryId
            };
        },

        getById: function (id, callback) {
            $http.get('/api/assignment/?id=' + id).success(callback);
        },

        getByIdEmployeeId: function (id, employeeId, callback) {
            $http.get('/api/assignment/?id=' + id + '&employeeId=' + employeeId).success(callback);
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
        },

        complete: function (id, employeeId, callback) {
            $http.post('/api/assignment/complete?id=' + id + '&employeeId=' + employeeId).success(callback);
        }
    };
}]);