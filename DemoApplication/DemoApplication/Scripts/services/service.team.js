Application.Services.factory('service.team', ['$http', function ($http) {
    return {
        getBrief: function (callback) {
            $http.get('/api/team/brief').success(callback);
        },

        getById: function (id, callback) {
            $http.get('/api/team/?id=' + id).success(callback);
        }
    };
}]);