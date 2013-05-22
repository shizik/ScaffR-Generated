Application.Services.factory('service.category', ['$http', function ($http) {
    return {
        getAll: function (callback) {
            // Should load them once and then cache
            $http.get('/api/category', { cache: true }).success(callback);
        }
    };
}]);