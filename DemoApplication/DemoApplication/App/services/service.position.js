NetGuide.Services.factory('service.position', ['$http', '$config', function ($http, $config) {
    return {
        getAll: function (callback) {
            $http.get($config.serviceRoot + 'position').success(callback);
        }
    };
}]);