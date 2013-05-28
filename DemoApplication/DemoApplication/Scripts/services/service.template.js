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

        apply: function (id, employeeId, callback) {
            $http.get('/api/template/apply?id=' + id + '&employeeId=' + employeeId).success(callback);
        },

        addDepartment: function (id, departmentId, callback) {
            $http.get('/api/template/addDepartment?id=' + id + '&departmentId=' + departmentId).success(callback);
        },

        deleteDepartment: function (id, departmentId, callback) {
            $http.get('/api/template/deleteDepartment?id=' + id + '&departmentId=' + departmentId).success(callback);
        }
    };
}]);