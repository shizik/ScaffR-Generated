Application.Utils.factory('commonUtils', function () {
    return {
        removeFromList: function (item, list) {
            var index = _.indexOf(list, item);

            if (index < 0) return;

            list.splice(index, 1);
        }
    };
});