/// <reference path="../global/global.angular.js" />
/// <reference path="../lib/underscore/underscore-1.4.2.js" />

Application.Filters.filter('customSort', function() {
    return function(items, strategy) {

        // implement correct sorting here

        var arr = [];

        switch (strategy) {
        case 'az':
// sort alphabetically ascending

            arr = _.sortBy(items, 'name');

            break;
        case 'za':
            arr = _.sortBy(items, 'name').reverse();

            break;
        }
        return arr;

    };
});

Application.Filters.filter('customFilter', function() {
    return function(items, filter) {

        // implement correct filtering here

        return items;
    };
});

Application.Filters.filter('queryFilter', function () {
    return function (items, propName, filterValue) {

        // implement correct filtering here

        return items;
    };
});