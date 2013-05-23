Application.Services.factory('service.employee', ['$http', function ($http) {
    return {
        getBrief: function (callback) {
            $http.get('/api/employee/brief').success(callback);
        },

        getById: function (id, callback) {
            $http.get('/api/employee/?id=' + id).success(callback);
        }
    };
}]);