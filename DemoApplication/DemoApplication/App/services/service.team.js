NetGuide.Services.factory('service.team', ['$http', '$config', function ($http, $config) {
    return {
        getBrief: function (callback) {
            $http.get($config.serviceRoot + 'team/brief').success(callback);
        },

        getById: function (id, callback) {
            $http.get($config.serviceRoot + 'team/?id=' + id).success(callback);
        },

        getActivity: function (id, callback) {
            $http.get($config.serviceRoot + 'team/getActivity?id=' + id).success(callback);
        },

        getAvailableMembers: function (id, callback) {
            $http.get($config.serviceRoot + 'team/getAvailableMembers/?id=' + id).success(callback);
        },

        addMembers: function (entity, callback) {
            $http.put($config.serviceRoot + 'team/addMembers', entity).success(callback);
        },

        deleteMember: function (id, employeeId, callback) {
            $http.delete($config.serviceRoot + 'team/deleteMember/?id=' + id + '&employeeId=' + employeeId).success(callback);
        },

        add: function (entity, callback) {
            $http.put($config.serviceRoot + 'team', entity).success(callback);
        },

        update: function (entity, callback) {
            $http.post($config.serviceRoot + 'team', entity).success(callback);
        },

        delete: function (id, callback) {
            $http.delete($config.serviceRoot + 'team/?id=' + id).success(callback);
        }
    };
}]);