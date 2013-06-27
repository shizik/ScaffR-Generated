NetGuide.Services.factory('service.template', ['$http', '$config', function ($http, $config) {
    return {
        getAll: function (callback) {
            $http.get($config.serviceRoot + 'template').success(callback);
        },

        getBrief: function (callback) {
            $http.get($config.serviceRoot + 'template/brief').success(callback);
        },

        getById: function (id, callback) {
            $http.get($config.serviceRoot + 'template/' + id).success(callback);
        },

        getActivity: function (id, callback) {
            $http.post($config.serviceRoot + 'template/getActivity?id=' + id).success(callback);
        },

        apply: function (id, employeeId, callback) {
            $http.get($config.serviceRoot + 'template/apply?id=' + id + '&employeeId=' + employeeId).success(callback);
        },

        add: function (entity, callback) {
            $http.put($config.serviceRoot + 'template', entity).success(callback);
        },

        update: function (entity, callback) {
            $http.post($config.serviceRoot + 'template', entity).success(callback);
        },

        delete: function (id, callback) {
            $http.delete($config.serviceRoot + 'template/?id=' + id).success(callback);
        },

        //
        // Department

        applyToDepartment: function (id, departmentId, callback) {
            $http.get($config.serviceRoot + 'template/applyToDepartment?id=' + id + '&departmentId=' + departmentId).success(callback);
        },

        addDepartment: function (id, departmentId, callback) {
            $http.get($config.serviceRoot + 'template/addDepartment?id=' + id + '&departmentId=' + departmentId).success(callback);
        },

        addAllDepartment: function (id, callback) {
            $http.post($config.serviceRoot + 'template/addAllDepartment?id=' + id).success(callback);
        },

        deleteDepartment: function (id, departmentId, callback) {
            $http.get($config.serviceRoot + 'template/deleteDepartment?id=' + id + '&departmentId=' + departmentId).success(callback);
        },

        //
        // Position

        applyToPosition: function (id, positionId, callback) {
            $http.get($config.serviceRoot + 'template/applyToPosition?id=' + id + '&positionId=' + positionId).success(callback);
        },

        addPosition: function (id, positionId, callback) {
            $http.get($config.serviceRoot + 'template/addPosition?id=' + id + '&positionId=' + positionId).success(callback);
        },

        addAllPosition: function (id, callback) {
            $http.post($config.serviceRoot + 'template/addAllPosition?id=' + id).success(callback);
        },

        deletePosition: function (id, positionId, callback) {
            $http.get($config.serviceRoot + 'template/deletePosition?id=' + id + '&positionId=' + positionId).success(callback);
        },
    };
}]);