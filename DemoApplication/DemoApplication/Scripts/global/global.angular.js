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
                var rootFolder = '/content/views';

                $routeProvider
                    .when('/employees', {
                        templateUrl: rootFolder + '/employees/index.html',
                        controller: 'employees.index'
                    })
                    .when('/employees/:id', {
                        templateUrl: rootFolder + '/employees/detail.html',
                        controller: 'employees.detail'
                    })
                    .when('/templates', {
                        templateUrl: rootFolder + '/templates/index.html',
                        controller: 'ctrlTemplatesIndex'
                    })
                    .when('/templates/:id', {
                        templateUrl: rootFolder + '/templates/detail.html',
                        controller: 'ctrlTemplatesDetail'
                    })
                    .when('/teams', {
                        templateUrl: rootFolder + '/teams/index.html',
                        controller: 'ctrlTeamsIndex'
                    })
                    .when('/teams/:id', {
                        templateUrl: rootFolder + '/teams/detail.html',
                        controller: 'ctrlTeamsDetail'
                    })
                    .when('/tasks/:id', {
                        templateUrl: rootFolder + '/tasks/edit.html',
                        controller: 'ctrlTasksEdit'
                    })
                    .otherwise({
                        redirectTo: '/employees'
                    });
            }])
    .run(function ($rootScope, $http, $location) {

    });

// web.config 
Application.Constants.constant('$config', {
    SERVICE_ROOT: '/Scripts/mock-data/'
});