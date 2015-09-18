var app = angular.module('minmax',[]);
app.controller('MinMaxCtrl', function($scope){
    $scope.formModel = {};

    $scope.onSubmit = function(){
      console.log("Apertado");
        console.log($scope.formModel);
    };
});