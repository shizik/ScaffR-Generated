Application.Utils.factory('commonUtils', function () {
    return {
        removeFromList: function (item, list) {
            var index = list.indexOf(item);

            list.splice(index, 1);
        }
    };
});