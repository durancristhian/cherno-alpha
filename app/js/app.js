var myApp = angular.module("myApp", ["ngStorage"]);

myApp.controller("myAppController", function ($scope, $localStorage) {

	$scope.init = function () {

		$scope.storage = $localStorage.$reset({
			todoLists: [{
				name: "My list",
				tasks: []
			}]
		});

		$scope.showTasks = false;
		$scope.newTask = "";
	}

	$scope.getAmountOfDoneTasks = function (todoList) {

		var amount = 0;

		angular.forEach(todoList.tasks, function (task) {

			if(task.done)
				amount++;
		});

		return amount;
	}

	$scope.showInformation = function () {

		alert("Be patient. I'm working on this functionality.");
	}

	$scope.addTask = function (todoList) {

		if($scope.newTask !== undefined && $scope.newTask !== "") {

			todoList.tasks.push({
				text: $scope.newTask,
				done: false
			});

			$scope.newTask = "";
		}
	}
});