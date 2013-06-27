NetGuide.Directives.directive('bDatepicker', function factory() {
    return {
        require: '?ngModel',
        restrict: 'A',
        link: function ($scope, element, attrs, controller) {
            var updateModel;
            updateModel = function (ev) {
                $(element).datepicker('hide').blur();
                return $scope.$apply(function () {
                    return controller.$setViewValue(moment(ev.date).toJSON());
                });
            };
            if (controller != null) {
                controller.$render = function () {
                    if (controller.$viewValue) {
                        $(element).datepicker().data().datepicker.date = moment(controller.$viewValue)._d;
                        $(element).datepicker('setValue').datepicker('update');
                    }

                    return controller.$viewValue;
                };
            }
            return attrs.$observe('bDatepicker', function (value) {
                var options;
                options = {};
                if (angular.isObject(value)) {
                    options = value;
                }
                if (typeof (value) === "string" && value.length > 0) {
                    options = angular.fromJson(value);
                }
                return $(element).datepicker(options).on('changeDate', updateModel);
            });
        }
    };
});