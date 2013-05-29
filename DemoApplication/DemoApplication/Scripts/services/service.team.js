Application.Services.factory('service.team', ['$http', function ($http) {
    return {
        getBrief: function (callback) {
            $http.get('/api/team/brief').success(callback);
        },

        getById: function (id, callback) {
            $http.get('/api/team/?id=' + id).success(callback);
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