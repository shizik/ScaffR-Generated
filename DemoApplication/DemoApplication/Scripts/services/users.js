/// <reference path="../global/global.angular.js" />

Application.Services.factory('users', function($http) {

    return {
        get: function(username) {
            alert('username');
        }
    };

});