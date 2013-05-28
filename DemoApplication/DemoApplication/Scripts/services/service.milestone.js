Application.Services.factory('service.milestone', ['$http', function ($http) {
    return {
        getAll: function (callback) {
            // Should load them once and then cache
            $http.get('/api/milestone', { cache: true }).success(callback);
        }
    };
}]);