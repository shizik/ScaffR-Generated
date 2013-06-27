'use strict';

// global.asax
var Application = Application || {};

Application.Constants = angular.module('application.constants', []);
Application.Utils = angular.module('application.utils', []);
Application.Models = angular.module('application.models', []);
Application.Services = angular.module('application.services', []);
Application.Controllers = angular.module('application.controllers', []);
Application.Filters = angular.module('application.filters', []);
Application.Directives = angular.module('application.directives', []);

angular.module('application', ['ui.bootstrap',
                               'blueimp.fileupload',
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
        ['$routeProvider', '$httpProvider',
            function ($routeProvider, $httpProvider) {
                var rootFolder = '/content/views';

                $routeProvider
                    //
                    // Employee Routes

                    .when('/employees', {
                        templateUrl: rootFolder + '/employees/index.html',
                        controller: 'employees.index'
                    })
                    .when('/employees/:id', {
                        templateUrl: rootFolder + '/employees/detail.html',
                        controller: 'employees.detail'
                    })
                    .when('/mytasks', {
                        templateUrl: rootFolder + '/employees/mytasks.html',
                        controller: 'employees.mytasks'
                    })

                    //
                    // Template Routes

                    .when('/templates', {
                        templateUrl: rootFolder + '/templates/index.html',
                        controller: 'templates.index'
                    })
                    .when('/templates/detail/:id', {
                        templateUrl: rootFolder + '/templates/detail.html',
                        controller: 'templates.detail'
                    })

                    //
                    // Team Routes

                    .when('/teams', {
                        templateUrl: rootFolder + '/teams/index.html',
                        controller: 'teams.index'
                    })
                    .when('/teams/detail/:id', {
                        templateUrl: rootFolder + '/teams/detail.html',
                        controller: 'teams.detail'
                    })

                    //
                    // Task Routes

                    .when('/tasks', {
                        templateUrl: rootFolder + '/tasks/index.html',
                        controller: 'tasks.index'
                    })
                    .when('/tasks/edit/', {
                        templateUrl: rootFolder + '/tasks/edit.html',
                        controller: 'tasks.edit'
                    })

                    //
                    // Default Route

                    .otherwise({
                        redirectTo: '/employees'
                    });

                $httpProvider.responseInterceptors.push(['$q', 'toastr', function ($q, toastr) {
                    return function (promise) {
                        return promise.then(function (response) {
                            return response;
                        }, function (response) {

                            switch (response.status) {
                                case 401:
                                    window.location = "/";
                                    break;
                                case 404:
                                    toastr.error("Resource was not found.");
                                    break;
                                default:
                                    toastr.error("There was a server error while issuing the request.");
                            }

                            return $q.reject(response);
                        });
                    };
                }]);
            }]);

// web.config 
Application.Constants.constant('$config', {
    SERVICE_ROOT: '/Scripts/mock-data/'
});