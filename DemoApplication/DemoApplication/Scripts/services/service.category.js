Application.Services.factory('service.category', ['$http', function ($http) {
    return {
        getAll: function (callback) {

            $http.get('/api/category')
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