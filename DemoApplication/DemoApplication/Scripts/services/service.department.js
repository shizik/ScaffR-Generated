Application.Services.factory('service.department', ['$http', function ($http) {
    return {
        getAll: function (callback) {
            $http.get('/api/department').success(callback);
        }
    };
}]);