/**
 * Created by MateusPelegrino on 18/09/15.
 */
var app = angular.module('login', [
    'jcs-autoValidate',
    'angular-ladda'
]);
app.run(function (defaultErrorMessageResolver) {
        defaultErrorMessageResolver.getErrorMessages().then(function (errorMessages) {
            errorMessages['minError'] = 'O campo deve ter no mínimo {0} caracteres.';
            errorMessages['fieldRequired'] = 'É obrigatório o preenchimento do campo.';
            errorMessages['badUsername'] = 'Nome de usuário só deve conter números, letras e _';
        });
    }
);

app.controller('LoginCtrl', function ($scope) {
    $scope.formModel = {};
    $scope.submitting = false;

    $scope.onSubmit = function () {
        console.log($scope.formModel);
        $scope.submitting = $scope.submitting?false:true
    }
});