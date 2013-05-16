/// <reference path="../global/global.angular.js" />

Application.Services.factory('teams', ['$resource', 'datacontext', function ($resource, datacontext) {

    // TODO: Change with WebApi endpoint
    var endPoint = $resource('/Scripts/mock-data/teams/:file.js', {}, {
        get: { method: 'GET', params: { file: '@file' } },
        getSummary: { method: 'GET', params: { file: '@file' }, isArray: true },
        individual: { method: 'GET', params: { file: 'x' }, isArray: false },
    });

    return {
        getSummary: function () {
            return endPoint.getSummary({ file: "summary" });
        },
        individual: endPoint.individual,
        summary: function () {
            return datacontext.query('TeamBrief').execute();
        },
    };
}]);