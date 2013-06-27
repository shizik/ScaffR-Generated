NetGuide.Services.factory('service.principal', ['$http', '$config', function ($http, $config) {
    return {
        getAll: function (callback) {
            $http.get($config.serviceRoot + 'principal').success(callback);
        }
    };
}]);