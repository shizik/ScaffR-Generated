/// <reference path="../global/global.angular.js" />

Application.Services.factory('employee', function ($resource) {
    // TODO: Change with WebApi endpoint
    return $resource('/Scripts/mock-data/employees/:file.js', {}, {
        summary: { method: 'GET', params: { file: 'summary2' }, isArray: false },
        individual: { method: 'GET', params: { file: 'x' }, isArray: false },
    });
});