Application.Models.run(function (breeze, datacontext) {
    // The empty metadataStore to which we add types
    var store = datacontext.metadata;

    store.registerEntityTypeCtor("TeamBrief", null, initializer);

    function initializer(model) {
        model.total = model.open + model.overdue + model.closed;
    }
});

