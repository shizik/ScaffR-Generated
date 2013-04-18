/// <reference path="../global/global.angular.js" />

Application.Services.factory('departments', function ($resource) {

    // TODO: Change with WebApi endpoint
    var endPoint = $resource('/Scripts/mock-data/departments/:file.js', {}, {
        get: { method: 'GET', params: { file: '@file' } },
        getSummary: { method: 'GET', params: { file: '@file' }, isArray: true },
    });

    return {
        getAll: function () {
            return endPoint.getSummary({ file: "summary" });
        }
    };

});