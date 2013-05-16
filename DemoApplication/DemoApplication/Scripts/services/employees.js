Application.Services.factory('employees', function ($resource, datacontext) {
    // TODO: Change with WebApi endpoint
    var resource = $resource('/Scripts/mock-data/employees/:file.js', {}, {
        summary: { method: 'GET', params: { file: 'summary2' }, isArray: false },
        individual: { method: 'GET', params: { file: 'x' }, isArray: false },
    });

    return {
        //summary: resource.summary,
        summary: function() {
            return datacontext.query('EmployeeBrief').execute();
        },
        individual: resource.individual,
        test: function () {
            return datacontext.query('Assignments').execute();
        },
        save: function () {
            return datacontext.saveChanges();
        }
    };
});