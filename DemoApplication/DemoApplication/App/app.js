'use strict';

var NetGuide = NetGuide || {};

NetGuide.Constants = angular.module('netGuide.constants', []);
NetGuide.Utils = angular.module('netGuide.utils', []);
NetGuide.Models = angular.module('netGuide.models', []);
NetGuide.Services = angular.module('netGuide.services', []);
NetGuide.Controllers = angular.module('netGuide.controllers', []);
NetGuide.Filters = angular.module('netGuide.filters', []);
NetGuide.Directives = angular.module('netGuide.directives', []);

angular.module('application', [// 'ui.bootstrap',
                               'blueimp.fileupload',
                               'netGuide.utils',
                               'netGuide.filters',
                               'netGuide.services',
                               'netGuide.directives',
                               'netGuide.constants',
                               'netGuide.models',
                               'netGuide.controllers'])
    .value('toastr', window.toastr)
    .config(
        ['$routeProvider', '$httpProvider', '$config',
            function ($routeProvider, $httpProvider, $config) {
                $routeProvider
                    //
                    // Employee Routes

                    .when('/employees', {
                        templateUrl: $config.viewsRoot + '/employees/index.html',
                        controller: 'employees.index'
                    })
                    .when('/employees/:id', {
                        templateUrl: $config.viewsRoot + '/employees/detail.html',
                        controller: 'employees.detail'
                    })
                    .when('/mytasks', {
                        templateUrl: $config.viewsRoot + '/employees/mytasks.html',
                        controller: 'employees.mytasks'
                    })

                    //
                    // Template Routes

                    .when('/templates', {
                        templateUrl: $config.viewsRoot + '/templates/index.html',
                        controller: 'templates.index'
                    })
                    .when('/templates/detail/:id', {
                        templateUrl: $config.viewsRoot + '/templates/detail.html',
                        controller: 'templates.detail'
                    })

                    //
                    // Team Routes

                    .when('/teams', {
                        templateUrl: $config.viewsRoot + '/teams/index.html',
                        controller: 'teams.index'
                    })
                    .when('/teams/detail/:id', {
                        templateUrl: $config.viewsRoot + '/teams/detail.html',
                        controller: 'teams.detail'
                    })

                    //
                    // Task Routes

                    .when('/tasks', {
                        templateUrl: $config.viewsRoot + '/tasks/index.html',
                        controller: 'tasks.index'
                    })
                    .when('/tasks/edit/', {
                        templateUrl: $config.viewsRoot + '/tasks/edit.html',
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

NetGuide.Constants.constant('$config', {
    serviceRoot: 'api/',
    viewsRoot: 'app/views/',
    templatesRoot: 'app/templates/'
});