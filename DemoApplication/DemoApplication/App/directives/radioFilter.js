NetGuide.Directives.directive('radioFilter', ['$config', function factory($config) {
    return {
        restrict: 'E',
        templateUrl: $config.templatesRoot + 'radioFilter.html',
        scope: {
            list: '=',
            filter: '=',
            value: '@',
            display: '@',
            count: '@'
        },
        replace: true,
        link: function ($scope, element) {
            $(element).on('click', 'input:checkbox', function () {
                var $checkbox = $(this);

                if (!$checkbox.is(':checked')) return;

                $('input:checkbox', element).not($checkbox).attr('checked', false);
            });
        },
        controller: function ($scope) {
            var prevValue = undefined;

            $scope.setValue = function (value) {
                if (value && prevValue == value) value = undefined;

                if (_.isArray($scope.filter)) {
                    if (value)
                        $scope.filter[0] = value;
                    else
                        $scope.filter = [];
                } else {
                    $scope.filter = value;
                }

                prevValue = value;

                console.log('radioFilter', $scope.filter);
            };
        }
    };
}]);