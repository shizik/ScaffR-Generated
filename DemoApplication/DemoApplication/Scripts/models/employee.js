Application.Models.run(function (datacontext) {

    datacontext.metadata.registerEntityTypeCtor("EmployeeBrief", null, function initializer(model) {
        model.name = model.firstName + " " + model.lastName;
        model.total = model.open + model.overdue/* + model.closed*/;
    });

    datacontext.metadata.registerEntityTypeCtor("Employee", null, function initializer(model) {
        model.name = model.firstName + " " + model.lastName;
        model.open = 0;
        model.overdue = 0;
        model.closed = 0;
        model.total = 0;
    });
});

