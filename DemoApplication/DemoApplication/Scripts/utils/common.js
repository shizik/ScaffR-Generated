Application.Utils.factory('commonUtils', function () {
    return {
        removeFromList: function (item, list) {
            var index = list.indexOf(item);

            if (index < 0) return;

            list.splice(index, 1);
        }
    };
});