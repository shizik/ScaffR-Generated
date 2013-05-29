Application.Services.factory('service.team', ['$http', function ($http) {
    return {
        getBrief: function (callback) {
            $http.get('/api/team/brief').success(callback);
        },

        getById: function (id, callback) {
            $http.get('/api/team/?id=' + id).success(callback);
        },

        getAvailableMembers: function (id, callback) {
            $http.get('/api/team/getAvailableMembers/?id=' + id).success(callback);
        },

        addMembers: function (entity, callback) {
            $http.put('/api/team/addMembers', entity).success(callback);
        },

        deleteMember: function (id, employeeId, callback) {
            $http.delete('/api/team/deleteMember/?id=' + id + '&employeeId=' + employeeId).success(callback);
        },

        add: function (entity, callback) {
            $http.put('/api/team', entity).success(callback);
        },

        update: function (entity, callback) {
            $http.post('/api/team', entity).success(callback);
        },

        delete: function (id, callback) {
            $http.delete('/api/team/?id=' + id).success(callback);
        }
    };
}]);