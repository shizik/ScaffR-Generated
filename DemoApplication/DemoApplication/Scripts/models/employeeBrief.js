Application.Models.run(function (breeze, datacontext) {
    // The empty metadataStore to which we add types
    var store = datacontext.metadata;

    store.registerEntityTypeCtor("EmployeeBrief", null, initializer);

    function initializer(model) {
        model.name = model.firstName + " " + model.lastName;
        model.total = model.open + model.overdue/* + model.closed*/;
    }
});

