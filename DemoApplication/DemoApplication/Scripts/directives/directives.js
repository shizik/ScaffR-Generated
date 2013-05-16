Application.Directives.directive('checkboxFilter', function factory() {

    return {
        restrict: 'E',
        templateUrl: '/content/templates/employee/checkboxFilter.html',
        scope: {
            list: '=',
            filter: '=',
            value: '@',
            display: '@',
            count: '@'
        },
        replace: true,
        controller: function ($scope) {
            $scope.selection = [];

            $scope.$watch('selection', function () {
                $scope.filter = [];

                _.each($scope.selection, function (value, index) {
                    if (!value) return;

                    $scope.filter.push($scope.list[index][$scope.value || 'id']);
                });

                console.log('checkboxFilter', $scope.filter);

            }, true);
        }
    };
});

Application.Directives.directive('radioFilter', function factory() {

    return {
        restrict: 'E',
        templateUrl: '/content/templates/employee/radioFilter.html',
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
});

Application.Directives.directive('pager', function factory() {
    return {
        restrict: 'E',
        templateUrl: '/content/templates/employee/pager.html',
        scope: {
            sizes: '@',
            pageSize: '=',
            currentPage: '=',
            list: '='
        },
        replace: true,
        controller: function ($scope) {
            $scope.listLength = 0;
            $scope.$watch('list', function () {
                if (!$scope.list) return;

                $scope.listLength = $scope.list.length;
            });

            //
            // Next / Previous Page

            $scope.hasPrev = function () {
                return $scope.currentPage > 0;
            };

            $scope.hasNext = function () {
                return $scope.currentPage * $scope.pageSize + $scope.pageSize < $scope.listLength;
            };

            $scope.prevPage = function () {
                if (!$scope.hasPrev()) return;

                $scope.currentPage--;
            };

            $scope.nextPage = function () {
                if (!$scope.hasNext()) return;

                $scope.currentPage++;
            };

            //
            // Page Sizes

            // TODO: size is always undefined, have no idea why
            $scope.sizes = $scope.sizes || '10,15,20'; //'15,50,100'
            $scope.pageSizes = $scope.sizes.split(',');
            $scope.pageSizes.push('All');

            $scope.changePageSize = function (value) {
                console.log('changePageSize', value);
                if (value == 'All')
                    $scope.pageSize = $scope.listLength;
                else
                    $scope.pageSize = parseInt(value);

                $scope.currentPage = 0;
            };
            $scope.changePageSize($scope.pageSizes[0]);
        }
    };
});

Application.Directives.directive('complexMenu', function factory() {
    return function (scope, element) {
        $(element)
            .addClass('nav nav-list')
            .click(function (e) {
                e.stopPropagation();
            });
    };
});

Application.Directives.directive('collapsible', function factory() {
    return {
        restrict: 'C',
        template: '<div><div data-complex-menu class="accordion-toggle"><i class=""></i><a>{{title}}</a></div>' +
                  '<ul class="nav nav-list" ng-transclude></ul></div>',
        scope: {
            title: '@'
        },
        replace: true,
        transclude: true,
        link: function ($scope, element) {
            var opened = true;

            $(element).children(':first-child').click(function () {
                opened = !opened;

                $(this).children(':first-child')
                       .removeClass(opened ? 'icon-chevron-right' : 'icon-chevron-down')
                       .addClass(opened ? 'icon-chevron-down' : 'icon-chevron-right');

                $(this).next().toggle(opened);
            }).click();
        }
    };
});

Application.Directives.directive('layoutChange', function factory() {
    return {
        templateUrl: '/content/templates/directives/layoutChange.html',
        scope: {
            display: '='
        },
        replace: true,
        controller: function ($scope) {
            $scope.display = 'tiles';
        }
    };
});