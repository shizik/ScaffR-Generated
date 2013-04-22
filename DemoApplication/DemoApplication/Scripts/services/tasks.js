/// <reference path="../global/global.angular.js" />

Application.Services.factory('tasks', function ($resource) {

    // TODO: Change with WebApi endpoint
    var endPoint = $resource('/Scripts/mock-data/tasks/:file.js', {}, {
        get: { method: 'GET', params: { file: '@file' } },
        query: { method: 'GET', params: { file: '@file' }, isArray: true },
        summary: { method: 'GET', params: { file: '@file' }, isArray: true },
    });

    return {
        getById: function (id) {
            return endPoint.get({ file: "task" });
        },

        getInTemplate: function (templateId) {
            return endPoint.query({ file: "list" });
        },

        markStatus: function (taskId, isDone) {
            // TODO: Add logic
        },

        save: function (task) {
            // TODO: Add logic to save the task
        },

        delete: function (task) {
            // TODO: Add logic to delete the task
        },
        
        summary: function() {
            return endPoint.summary({ file: "summary" });
        }

    };
});