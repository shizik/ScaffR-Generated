Application.Services.factory('datacontext', function (breeze, toastr, $timeout) {

    breeze.config.initializeAdapterInstance("modelLibrary", "backingStore", true);

    var adapter = new breeze.JsonResultsAdapter({
        name: "customAdapter",

        visitNode: function (node, parseContext, nodeContext) {
            return { entityType: node.$type };
        }
    });

    var dataService = new breeze.DataService({
        serviceName: '/api/netchexapi',
        hasServerMetadata: true,
        jsonResultsAdapter: adapter
    });

    var manager = new breeze.EntityManager({ dataService: dataService });

    var query = function (entity) {
        return breeze.EntityQuery.from(entity).using(manager);
    };

    var dataservice = {
        metadata: manager.metadataStore,
        createEntity: manager.createEntity,
        query: query,
        saveChanges: saveChanges
    };
    return dataservice;

    function saveChanges() {
        return manager.saveChanges()
            .then(saveSucceeded)
            .fail(saveFailed);

        function saveSucceeded(saveResult) {
            toastr.success("Saved Successfully.");
        }

        function saveFailed(error) {
            var reason = error.message;
            var detail = error.detail;

            if (reason === "Validation error") {
                reason = handleSaveValidationError(error);
            } else if (detail && detail.ExceptionType &&
                detail.ExceptionType.indexOf('OptimisticConcurrencyException') !== -1) {
                // Concurrency error 
                reason =
                    "Another user, perhaps the server, " +
                    "may have deleted one or all of the todos." +
                    " You may have to restart the app.";
            } else {
                reason = "Failed to save changes: " + reason +
                         " You may have to restart the app.";
            }

            toastr.error(error, reason);
            // DEMO ONLY: discard all pending changes
            // Let them see the error for a second before rejecting changes
            $timeout(function () {
                manager.rejectChanges();
            }, 1000);
            throw error; // so caller can see it
        }
    }

    function handleSaveValidationError(error) {
        var message = "Not saved due to validation error";
        try { // fish out the first error
            var firstErr = error.entitiesWithErrors[0].entityAspect.getValidationErrors()[0];
            message += ": " + firstErr.errorMessage;
        } catch (e) { /* eat it for now */ }
        return message;
    }
});