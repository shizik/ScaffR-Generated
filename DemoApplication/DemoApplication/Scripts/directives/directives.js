/// <reference path="../global/global.angular.js" />
/// <reference path="../lib/underscore/underscore-1.4.2.js" />

Application.Directives.directive('flexFilter', function factory($parse, list) {

    var definition = {
        restrict: 'E',
        templateUrl: '/content/templates/employee/statusFilter.html',
        scope: {
            list: '=list'
        },
        replace: true,
        link: function (scope, element, attrs) {

            console.log('list', scope, element);
           
        }
    };

    return definition;

});

Application.Directives.directive('flexFilterItem', function factory($parse, list) {

    var definition = {
        restrict: 'E',
        template: '<label class="checkbox"><input type="checkbox" ng-model="{{item.selected}}"/>{{item.status}} {{item.count}}</label>',
        replace: true,
        scope: {
            item: '=item'
        },
        link: function (scope, element, attrs) {
            scope.$watch(attrs.item, function(name) {
                console.log('name was changed');
            });
        }
    };

    return definition;

});

Application.Directives.directive('task', function factory($parse) {

    var definition = {
        restrict: 'E',
        templateUrl: '/content/templates/employee/task.html',
        scope: {
            task: '=task'
        },
        replace: true,
        link: function(scope, element, attrs) {
            scope.$watch('task', function(task) {
                
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