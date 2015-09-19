var app = angular.module('cadastroCliente', [
	'jcs-autoValidate',
	'angular-ladda'
]);

app.run(function (defaultErrorMessageResolver) {
		defaultErrorMessageResolver.getErrorMessages().then(function (errorMessages) {
			errorMessages['tooYoung'] = 'You must be at least {0} years old to use this site';
			errorMessages['tooOld'] = 'You must be max {0} years old to use this site';
			errorMessages['badUsername'] = 'Username can only contain numbers and letters and _';
		});
	}
);


app.controller('CadastroClienteCtrl', function ($scope) {
	$scope.formModel = {};
	$scope.submitting = false;
	$scope.onSubmit = function () {
		$scope.submitting = true;
	};
});