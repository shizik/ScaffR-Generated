﻿Application.Models.run(function (breeze, datacontext) {
    // Extract Breeze metadata definition types
    var dataType = breeze.DataType;
    var autoGeneratedKeyType = breeze.AutoGeneratedKeyType;

    // The empty metadataStore to which we add types
    var store = datacontext.metadata;

    // Type definitions
    store.addEntityType({
        shortName: "Employee",
        namespace: "Models",
        autoGeneratedKeyType: autoGeneratedKeyType.Identity,
        dataProperties: {
            id: { dataType: dataType.Int32, isNullable: false, isPartOfKey: true },
            firstName: { dataType: dataType.String, maxLength: 255, isNullable: false },
            lastName: { dataType: dataType.String, maxLength: 255, isNullable: false },
            title: { dataType: dataType.String, maxLength: 255, isNullable: false },
            email: { dataType: dataType.String, maxLength: 255, isNullable: false }
        },
        navigationProperties: {
            tasks: {
                entityTypeName: "Assignment",
                isScalar: false,
                associationName: "Employee_Assignments"
            }
        }
    });

    store.registerEntityTypeCtor("Employee");
});
