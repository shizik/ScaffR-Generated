Application.Controllers.controller('file.destroy',
            ['$scope', '$http',
    function ($scope, $http) {

        var file = $scope.file,
            state;

        if (!file.url) return;

        file.$state = function () {
            return state;
        };

        file.$destroy = function () {
            state = 'pending';
            return $http.delete(file.deleteUrl).then(
                function () {
                    state = 'resolved';
                    $scope.clear(file);
                },
                function () {
                    state = 'rejected';
                }
            );
        };

    }]);