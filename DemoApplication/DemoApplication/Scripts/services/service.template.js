Application.Services.factory('service.template', ['$http', function ($http) {
    return {
        getAll: function (callback) {
            $http.get('/api/template').success(callback);
        },

        getBrief: function (callback) {
            $http.get('/api/template/brief').success(callback);
        },

        getById: function (id, callback) {
            $http.get('/api/template/' + id).success(callback);
        },

        getActivity: function (id, callback) {
            $http.post('/api/template/getActivity?id=' + id).success(callback);
        },

        apply: function (id, employeeId, callback) {
            $http.get('/api/template/apply?id=' + id + '&employeeId=' + employeeId).success(callback);
        },

        add: function (entity, callback) {
            $http.put('/api/template', entity).success(callback);
        },

        update: function (entity, callback) {
            $http.post('/api/template', entity).success(callback);
        },

        delete: function (id, callback) {
            $http.delete('/api/template/?id=' + id).success(callback);
        },

        //
        // Department

        applyToDepartment: function (id, departmentId, callback) {
            $http.get('/api/template/applyToDepartment?id=' + id + '&departmentId=' + departmentId).success(callback);
        },

        addDepartment: function (id, departmentId, callback) {
            $http.get('/api/template/addDepartment?id=' + id + '&departmentId=' + departmentId).success(callback);
        },

        addAllDepartment: function (id, callback) {
            $http.post('/api/template/addAllDepartment?id=' + id).success(callback);
        },

        deleteDepartment: function (id, departmentId, callback) {
            $http.get('/api/template/deleteDepartment?id=' + id + '&departmentId=' + departmentId).success(callback);
        },

        //
        // Position

        applyToPosition: function (id, positionId, callback) {
            $http.get('/api/template/applyToPosition?id=' + id + '&positionId=' + positionId).success(callback);
        },

        addPosition: function (id, positionId, callback) {
            $http.get('/api/template/addPosition?id=' + id + '&positionId=' + positionId).success(callback);
        },

        addAllPosition: function (id, callback) {
            $http.post('/api/template/addAllPosition?id=' + id).success(callback);
        },

        deletePosition: function (id, positionId, callback) {
            $http.get('/api/template/deletePosition?id=' + id + '&positionId=' + positionId).success(callback);
        },
    };
}]);