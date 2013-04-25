/// <reference path="../global/global.angular.js" />
/// <reference path="../lib/underscore/underscore-1.4.2.js" />

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
        controller: function ($scope) {
            $scope.data = { selectedOption: undefined };

            $scope.clear = function () {
                $scope.data.selectedOption = undefined;
            };

            $scope.$watch('data', function (newValue) {
                var value = newValue.selectedOption;

                if (_.isArray($scope.filter)) {
                    if (value)
                        $scope.filter[0] = value;
                    else
                        $scope.filter = [];
                } else {
                    $scope.filter = value;
                }

                console.log('radioFilter', $scope.filter);
            }, true);
        }
    };
});

Application.Directives.directive('pager', function factory($parse) {
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
            $scope.sizes = $scope.sizes || '6,8,10'; //'15,50,100'
            $scope.pageSizes = $scope.sizes.split(',');
            $scope.pageSizes.push('All');

            $scope.changePageSize = function (value) {
                console.log('changePageSize', value);
                if (value == 'All')
                    $scope.pageSize = $scope.listLength;
                else
                    $scope.pageSize = parseInt(value);
            };
            $scope.changePageSize($scope.pageSizes[0]);
        }
    };
});

Application.Directives.directive('task', function factory() {

    var definition = {
        restrict: 'E',
        templateUrl: '/content/templates/employee/task.html',
        scope: {
            task: '=task'
        },
        replace: true,
        link: function (scope, element, attrs) {
            scope.$watch('task', function (task) {

            });
        }
    };
    return definition;

});

Application.Directives.directive('tile', function factory($parse) {

    var definition = {
        restrict: 'E',
        templateUrl: '/content/templates/employee/tile.html',
        scope: {
            person: '=person'
        },
        replace: true,
        compile: function (cElement, cAttrs) {
            return function linkFn(scope, lElement, lAttrs) {

                console.log(scope);

                scope.$watch('person', function (person) {

                    console.log('person', person);

                    if (person) {
                        var p = {
                            open: [],
                            closed: [],
                            overdue: []
                        };

                        for (var j = 0; j < person.tasks.length; j++) {
                            var task = person.tasks[j];
                            p[task.status].push(task);
                        }

                        person.totalOpen = p.open.length;
                        person.totalClosed = p.closed.length;
                        person.totalOverdue = p.overdue.length;
                        person.totalTasks = person.tasks.length;
                    }
                });
            };
        }
    };
    return definition;
});