/// <reference path="../global/global.angular.js" />

Application.Services.factory('assignables', function ($resource) {

    // TODO: Change with WebApi endpoint
    var endPoint = $resource('/Scripts/mock-data/assignables/:file.js', {}, {
        get: { method: 'GET', params: { file: '@file' } },
        getSummary: { method: 'GET', params: { file: '@file' }, isArray: true },
    });

    return {
        getSummary: function () {
            return endPoint.getSummary({ file: "summary" });
        }
    };

});