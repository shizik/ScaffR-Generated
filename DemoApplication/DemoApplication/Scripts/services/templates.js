/// <reference path="../global/global.angular.js" />

Application.Services.factory('templates', ['$resource', 'datacontext', function ($resource, datacontext) {

    // TODO: Change with WebApi endpoint
    var endPoint = $resource('/Scripts/mock-data/templates/:file.js', {}, {
        get: { method: 'GET', params: { file: '@file' } },
        getSummary: { method: 'GET', params: { file: '@file' }, isArray: true },
        individual: { method: 'GET', params: { file: 'x' }, isArray: false },
    });

    return {
        getById: function (id) {
            return endPoint.get({ file: "template" });
        },

        getSummary: function () {
            return endPoint.getSummary({ file: "summary" });
        },
        individual: endPoint.individual,

        summary: function () {
            return datacontext.query('TemplateBrief').execute();
        },

        save: function (name, tasks) {
            // TODO: Add logic to save the template
        }
    };
}]);