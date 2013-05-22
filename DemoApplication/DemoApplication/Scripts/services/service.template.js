Application.Services.factory('service.template', ['$http', function ($http) {
    return {
        getAll: function (callback) {
            $http.get('/api/template').success(callback);
        },

        getBrief: function (callback) {
            $http.get('/api/template/brief').success(callback);
        },

        getById: function (id, callback) {
            $http.get('/api/template/' + id).success(callback);
        }
    };
}]);