/// <reference path="../global/global.angular.js" />

Application.Services.factory('groups', ['$http', function($http) {

    return {
        get: function(username) {
            alert(username);
        }
    };

}]);