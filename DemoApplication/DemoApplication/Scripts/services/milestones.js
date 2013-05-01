/// <reference path="../global/global.angular.js" />

Application.Services.factory('milestones', function ($resource) {

    // TODO: Change with WebApi endpoint
    var endPoint = $resource('/Scripts/mock-data/milestones/:file.js', {}, {
        get: { method: 'GET', params: { file: '@file' } },
        list: { method: 'GET', params: { file: '@file' }, isArray: true },
    });

    return {
        list: function () {
            return endPoint.list({ file: "list" });
        }
    };

});