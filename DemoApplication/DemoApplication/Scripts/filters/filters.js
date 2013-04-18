/// <reference path="../global/global.angular.js" />
/// <reference path="../lib/underscore/underscore-1.4.2.js" />

Application.Filters.filter('customSort', function() {
    return function (items, strategy) {

        var arr = [];

        switch(strategy) {
            case 'az': // sort alphabetically ascending

                arr = _.sortBy(items, 'name');

                break;

            case 'za':
                
                arr = _.sortBy(items, 'name').reverse();

                break;
        }
        return arr;

    };
})