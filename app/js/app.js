var myApp = angular.module("myApp", []);

myApp.controller("myAppController", function ($scope) {

	$scope.init = function () {

		$scope.greeting = "Hello user! (:";
	};
});