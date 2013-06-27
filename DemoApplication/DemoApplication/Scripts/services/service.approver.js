Application.Services.factory('service.approver', ['$http', function ($http) {
    return {
        getBrief: function (callback) {
            $http.get('/api/approver/brief').success(callback);
        },

        getById: function (id, callback) {
            $http.get('/api/approver/?id=' + id).success(callback);
        },

        getMyTasks: function (callback) {
            $http.get('/api/approver/myTasks').success(callback);
        },
        
        getTasks: function (id, callback) {
            $http.get('/api/approver/getTasks?id=' + id).success(callback);
        }
    };
}]);