NetGuide.Services.factory('service.employee', ['$http', '$config', function ($http, $config) {
    return {
        getBrief: function (callback) {
            $http.get($config.serviceRoot + 'employee/brief').success(callback);
        },

        getById: function (id, callback) {
            $http.get($config.serviceRoot + 'employee/?id=' + id).success(callback);
        },
        
        getActivity: function (id, callback) {
            $http.get($config.serviceRoot + 'employee/getActivity?id=' + id).success(callback);
        },
        
        getTasks: function (id, callback) {
            $http.get($config.serviceRoot + 'employee/getTasks?id=' + id).success(callback);
        }
    };
}]);