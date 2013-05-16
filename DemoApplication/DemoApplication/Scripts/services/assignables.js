/// <reference path="../global/global.angular.js" />

Application.Services.factory('assignables', function ($resource) {

    // TODO: Change with WebApi endpoint
    return $resource('/Scripts/mock-data/assignables/:file.js', {}, {
        get: { method: 'GET', params: { file: '@file' } },
        getAll: { method: 'GET', params: { file: 'summary' }, isArray: true },
    });
});