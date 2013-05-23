Application.Services.factory('service.principal', ['$http', function ($http) {
    return {
        getAll: function (callback) {
            $http.get('/api/principal').success(callback);
        }
    };
}]);