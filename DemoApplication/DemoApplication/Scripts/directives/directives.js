﻿Application.Directives.directive('checkboxFilter', function factory() {

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

Application.Directives.directive('task', function factory() {
    return {
        restrict: 'E',
        templateUrl: '/content/templates/employee/task.html',
        scope: {
            task: '=',
            available: '=',
            assignables: '=',
            detailsFn: '&',
            deleteFn: '&'
        },
        replace: true,
        controller: function ($scope) {
            $scope.taskMode = $scope.task.name == null ? 'new' : 'display';

            $scope.editMode = function () {
                //$scope.taskMode = 'edit';
                // TODO: This is for demo purposes
                window.location.href = '/tasks/ondemand/1';
            };

            $scope.assignment = { selectedOption: undefined };
            $scope.$watch('assignment', function (newValue) {
                if (!newValue.selectedOption) return;

                $scope.task.name = newValue.selectedOption;
                $scope.taskMode = 'display';
            }, true);

            $scope.assignee = { selectedOption: undefined };
            $scope.$watch('assignee', function (newValue) {
                if (!newValue.selectedOption) return;

                $scope.task.assignee = newValue.selectedOption;
            }, true);

            $scope.isNew = function () {
                return $scope.task.name == null || $scope.task.assignee == null || $scope.task.due == null;
            };

            $scope.newCreated = $scope.isNew();


            $scope.preventClosing = function ($event) {
                $event.stopPropagation();
            };

            $scope.days = function () {
                if ($scope.task.due == null) return 0;

                return moment($scope.task.due).diff(moment(), 'days');
            };

            $scope.isOverdue = function () {
                return $scope.days() < 0;
            };

            $scope.dateClass = function () {
                if ($scope.task.isDone) return 'success';
                else if ($scope.days() < 0) return 'warning';
                else if ($scope.days() == 0) return 'error';

                return 'info';
            };

            //
            // Button actions

            $scope.saveTask = function () {
                // TODO: Add logic for saving
                $scope.newCreated = false;
                toastr.success("Saved");
            };

            $scope.details = function () {
                $scope.detailsFn({ task: $scope.task });
            };

            $scope.deleteTask = function () {
                $scope.deleteFn({ task: $scope.task });
            };

            $scope.editTask = function () {
                // TODO: Open the details page
            };
        }
    };
});

Application.Directives.directive('tile', function factory(employeeUtils) {
    return {
        restrict: 'E',
        templateUrl: '/content/templates/employee/tile.html',
        scope: {
            person: '='
        },
        replace: true,
        controller: function ($scope) {

            $scope.goToDetails = function () {
                // TODO: Should use the location service
                window.location.href = '/employee/index/' + $scope.person.id;
            };

            $scope.counts = function () {
                return employeeUtils.getCounts($scope.person);
            };

            $scope.badgeClass = '';
            $scope.badgeCount = function () {
                var counts = $scope.counts();

                $scope.badgeClass = counts.overdue > 0 ? 'badge-warning' : 'badge-info';

                return counts.overdue > 0 ? counts.overdue : counts.open;
            };
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
        template: '<div><div class="accordion-toggle"><i class=""></i><a>{{title}}</a></div>' +
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