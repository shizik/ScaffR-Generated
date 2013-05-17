/// <reference path="../global/global.angular.js" />

Application.Services.factory('teams', ['$resource', 'datacontext', function ($resource, datacontext) {

    // TODO: Change with WebApi endpoint
    var endPoint = $resource('/Scripts/mock-data/teams/:file.js', {}, {
        get: { method: 'GET', params: { file: '@file' } },
        getSummary: { method: 'GET', params: { file: 'summary2' }, isArray: false },
        individual: { method: 'GET', params: { file: 'x' }, isArray: false },
    });

    return {
        getSummary: endPoint.getSummary,
        individual: endPoint.individual,
        summary: function () {
            return datacontext.query('TeamBrief').execute();
        },
    };
}]);