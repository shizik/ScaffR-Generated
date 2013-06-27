NetGuide.Directives.directive('complexMenu', function factory() {
    return function (scope, element) {
        $(element)
            .addClass('nav nav-list')
            .click(function (e) {
                e.stopPropagation();
            });
    };
});

NetGuide.Directives.directive('collapsible', function factory() {
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

NetGuide.Directives.directive('layoutChange', ['$config', function factory($config) {
    return {
        templateUrl: $config.templatesRoot + 'layoutChange.html',
        scope: {
            display: '='
        },
        replace: true,
        controller: function ($scope) {
            $scope.display = 'tiles';
        }
    };
}]);

NetGuide.Directives.directive('taskBadge', function factory() {
    return {
        template: '<span class="badge badge-{{ dateClass() }}">{{ days() }} Days</span>',
        scope: {
            task: '='
        },
        replace: true,
        controller: function ($scope) {
            $scope.days = function () {
                if ($scope.task.dueDate == null) return 0;

                return moment($scope.task.dueDate).diff(moment(), 'days');
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
        }
    };
});