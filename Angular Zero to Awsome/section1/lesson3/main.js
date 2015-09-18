var app = angular.module('minmax', []);

app.controller('MinMaxCtrl', function ($scope, $http) {
    $scope.formModel = {};

    $scope.onSubmit = function () {
        console.log("Apertado");
        console.log($scope.formModel);
        $http.post('https://minmax-server.herokuapp.com/register/', $scope.formModel).
            success(function (data) {
                console.log("OK");
            }).
            error(function (data) {
                console.log("FAIL");
            });
    };
});
