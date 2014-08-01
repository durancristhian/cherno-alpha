var myApp = angular.module("myApp", ["ngStorage", "ngAnimate", 'ngDialog']);

myApp.controller("myAppController", function ($scope, $localStorage, ngDialog) {

	$scope.init = function () {

		$scope.storage = $localStorage.$reset({
			todoLists: [{
				name: "Lista 1"
			}, {
				name: "Lista 2"
			}, {
				name: "Lista 3"
			}]
		});
	};

	$scope.addTodoList = function () {

		ngDialog.open({
			template: 'addTodoListTemplate',
			className: 'ngdialog-theme-plain'
		});
	};
});