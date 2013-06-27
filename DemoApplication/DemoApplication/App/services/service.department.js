NetGuide.Services.factory('service.department', ['$http', '$config', function ($http, $config) {
    return {
        getAll: function (callback) {
            $http.get($config.serviceRoot + 'department').success(callback);
        }
    };
}]);