'use strict';

// global.asax
var Application = Application || {};

Application.Constants = angular.module('application.constants', []);
Application.Utils = angular.module('application.utils', []);
Application.Models = angular.module('application.models', []);
Application.Services = angular.module('application.services', ['ngResource']);
Application.Controllers = angular.module('application.controllers', []);
Application.Filters = angular.module('application.filters', []);
Application.Directives = angular.module('application.directives', []);

angular.module('application', ['ui.bootstrap',
                               'application.utils',
                               'application.filters',
                               'application.services',
                               'application.directives',
                               'application.constants',
                               'application.models',
                               'application.controllers'])
    .value('breeze', window.breeze)
    .value('toastr', window.toastr)
    .config(
        ['$routeProvider',
            function ($routeProvider) {
                $routeProvider
                    .when('/', {
                        templateUrl: '/employee/index',
                        controller: 'listController'
                    })
                    .when('/employee/:id', {
                        templateUrl: '/employee/detail',
                        controller: 'employeeController'
                    })
                    .when('/task/:id', {
                        templateUrl: '/tasks/ondemand',
                        controller: 'tasksController'
                    })
                    .otherwise({
                        redirectTo: '/'
                    });
            }])
    .run(function ($rootScope, $http, $location) {

    });

// web.config 
Application.Constants.constant('$config', {
    SERVICE_ROOT: '/Scripts/mock-data/'
});