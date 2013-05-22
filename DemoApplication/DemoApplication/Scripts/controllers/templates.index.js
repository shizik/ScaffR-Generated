Application.Controllers.controller('templates.index',
                ['$scope', '$location', 'service.template', 'toastr',
        function ($scope, $location, templates, toastr) {
            $scope.$parent.backLinkText = undefined;

            $scope.filter = {
                status: undefined,
                assignedTo: undefined,
                team: undefined,
                department: undefined
            };

            templates.summary().then(function (data) {
                $scope.templates = data.results;
                $scope.$apply();
            }).fail(function (error) {
                console.log('error', error);
                toastr.error('An error occured while pulling the data.');
            });

            templates.getSummary(function (data) {
                $scope.departments = data.departments;
            });

            $scope.goToDetails = function (template) {
                $location.path('/templates/' + template.id);
            };

            $scope.containsStatus = function (status) {
                return _.contains($scope.filter.status, status);
            };

        }]);
