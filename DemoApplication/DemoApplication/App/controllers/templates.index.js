NetGuide.Controllers.controller('templates.index',
                ['$scope', '$location', 'service.template', 'toastr',
        function ($scope, $location, templates, toastr) {
            $scope.$parent.backLinkText = undefined;

            $scope.filter = {
                status: undefined,
                assignedTo: undefined,
                team: undefined,
                department: undefined
            };

            templates.getBrief(function (data) {
                $scope.templates = data;
            });

            //templates.getSummary(function (data) {
            //    $scope.departments = data.departments;
            //});

            $scope.goToDetails = function (template) {
                $location.path('/templates/detail/' + template.id);
            };

            $scope.containsStatus = function (status) {
                return _.contains($scope.filter.status, status);
            };

        }]);
