/// <reference path="../global/global.angular.js" />

Application.Services.factory('categories', function ($resource) {
    return $resource('/Scripts/mock-data/categories/:file.js', {}, {
        list: { method: 'GET', params: { file: 'list' }, isArray: true }
    });
});