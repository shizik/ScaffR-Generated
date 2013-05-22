Application.Services.factory('service.employee', ['$http', function ($http) {
    return {
        getBrief: function (callback) {

            $http.get('/api/employee/brief')
                .success(function (data) {
                    callback(data);
                })
                .error(function (data) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                });
        },

        getById: function (id, callback) {
            $http.get('/api/employee/' + id)
                .success(function (data) {
                    callback(data);
                })
                .error(function (data) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                });
        }
    };
}]);