NetGuide.Services.factory('service.assignment', ['$http', '$config', function ($http, $config) {
    return {
        getEmpty: function (categoryId) {
            return {
                id: 0,
                name: null,
                description: null,

                status: 1,
                dueDate: null,
                completedDate: null,

                principalIsTeam: null,
                resolvedByOne: null,
                principalId: undefined,
                approverId: null,
                employeeId: null,

                requiresSignature: false,
                requiresDownload: false,
                requiresUpload: false,

                recurring: false,

                taskId: null,
                categoryId: categoryId
            };
        },

        getById: function (id, callback) {
            $http.get($config.serviceRoot + 'assignment/?id=' + id).success(callback);
        },

        getByIdEmployeeId: function (id, employeeId, callback) {
            $http.get($config.serviceRoot + 'assignment/?id=' + id + '&employeeId=' + employeeId).success(callback);
        },

        getAttachments: function (id, callback) {
            $http.get($config.serviceRoot + 'assignment/attachments?id=' + id).success(callback);
        },

        add: function (entity, callback) {
            $http.put($config.serviceRoot + 'assignment', entity).success(callback);
        },

        addFromTask: function (entity, callback) {
            $http.put($config.serviceRoot + 'assignment/addFromTask', entity).success(callback);
        },

        update: function (entity, callback) {
            $http.post($config.serviceRoot + 'assignment', entity).success(callback);
        },

        delete: function (id, callback) {
            $http.delete($config.serviceRoot + 'assignment/?id=' + id).success(callback);
        },

        complete: function (id, employeeId, callback) {
            $http.post($config.serviceRoot + 'assignment/complete?id=' + id + '&employeeId=' + employeeId).success(callback);
        }
    };
}]);