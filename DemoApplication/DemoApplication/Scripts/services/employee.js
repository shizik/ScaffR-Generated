/// <reference path="../global/global.angular.js" />

Application.Services.factory('employee', function ($resource) {
    // TODO: Change with WebApi endpoint
    return $resource('/Scripts/mock-data/employees/summary2.js', {}, {
        summary: { method: 'GET', isArray: false },
    });
});