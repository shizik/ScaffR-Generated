/// <reference path="../global/global.angular.js" />

Application.Services.factory('employees', function ($resource) {

    // TODO: Change with WebApi endpoint
    var endPoint = $resource('/Scripts/mock-data/employees/:file.js', {}, {
        get: { method: 'GET', params: { file: '@file' } },
        getSummary: { method: 'GET', params: { file: '@file' }, isArray: true },
    });

    return {
        getById: function (id) {
            return endPoint.get({ file: id });
        },

        getSummary: function () {
            return endPoint.getSummary({ file: "summary" });
        }
    };

});