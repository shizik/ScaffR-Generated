NetGuide.Services.factory('service.category', ['$http', '$config', function ($http, $config) {
    return {
        getAll: function (callback) {
            // Should load them once and then cache
            $http.get($config.serviceRoot + 'category', { cache: true }).success(callback);
        }
    };
}]);