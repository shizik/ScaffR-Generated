NetGuide.Services.factory('service.approver', ['$http', '$config', function ($http, $config) {
    return {
        getBrief: function (callback) {
            $http.get($config.serviceRoot + 'approver/brief').success(callback);
        },

        getById: function (id, callback) {
            $http.get($config.serviceRoot + 'approver/?id=' + id).success(callback);
        },

        getMyTasks: function (callback) {
            $http.get($config.serviceRoot + 'approver/myTasks').success(callback);
        },

        getTasks: function (id, callback) {
            $http.get($config.serviceRoot + 'approver/getTasks?id=' + id).success(callback);
        }
    };
}]);