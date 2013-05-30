Application.Services.factory('service.position', ['$http', function ($http) {
    return {
        getAll: function (callback) {
            $http.get('/api/position').success(callback);
        }
    };
}]);