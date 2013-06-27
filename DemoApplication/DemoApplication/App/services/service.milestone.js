NetGuide.Services.factory('service.milestone', ['$http', '$config', function ($http, $config) {
    return {
        getAll: function (callback) {
            // Should load them once and then cache
            $http.get($config.serviceRoot + 'milestone', { cache: true }).success(callback);
        }
    };
}]);