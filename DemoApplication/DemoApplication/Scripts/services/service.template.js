Application.Services.factory('service.template', ['$http', function ($http) {
    return {
        getAll: function (callback) {

            $http.get('/api/template')
                .success(function (data) {
                    callback(data);
                })
                .error(function (data) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                });
        },

        getBrief: function (callback) {

            $http.get('/api/template/brief')
                .success(function (data) {
                    callback(data);
                })
                .error(function (data) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                });
        },

        getById: function (id, callback) {
            $http.get('/api/template/' + id)
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