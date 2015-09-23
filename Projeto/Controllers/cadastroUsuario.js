(function() {

    var app = angular.module("cadastroUsuario", ["ngMessages"]);

    var CadastroUsuarioCtrl= function($scope) {
        var model = this;

        model.message = "";

        model.user = {
            username: "",
            password: "",
            confirmPassword: "",
            funcao: {},
            name: ""
        };
        $scope.funcoes = [
            { id: 1, name: 'Administrador' },
            { id: 2, name: 'Vendedor' },
            { id: 3, name: 'Atendente' }
        ];
        model.submit = function(isValid) {
            if (isValid) {
                model.message = "Enviado " + model.user.username + " " +model.user.funcao.name;
            } else {
                //Falta acertar acentuacao
                model.message = "Ainda há campos inválidos";
            }
        };

    };


    var compareTo = function() {
        return {
            require: "ngModel",
            scope: {
                otherModelValue: "=compareTo"
            },
            link: function(scope, element, attributes, ngModel) {

                ngModel.$validators.compareTo = function(modelValue) {
                    return modelValue == scope.otherModelValue;
                };

                scope.$watch("otherModelValue", function() {
                    ngModel.$validate();
                });
            }
        };
    };

    app.directive("compareTo", compareTo);
    app.controller("CadastroUsuarioCtrl", CadastroUsuarioCtrl);

}());