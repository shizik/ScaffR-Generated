﻿'use strict';

// global.asax
var Application = Application || {};

Application.Constants = angular.module('application.constants', []);
Application.Services = angular.module('application.services', ['ngResource']);
Application.Controllers = angular.module('application.controllers', []);
Application.Filters = angular.module('application.filters', []);
Application.Directives = angular.module('application.directives', []);

angular.module('application', ['ui.bootstrap', 'application.filters', 'application.services', 'application.directives', 'application.constants', 'application.controllers'])
    .run(function ($rootScope, $http, $location) {
  
    });

// web.config 
Application.Constants.constant('$config', {
    SERVICE_ROOT: '/Scripts/mock-data/'
});