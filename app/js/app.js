var myApp = angular.module("myApp", ["ngStorage"]);

myApp.controller("myAppController", function ($scope, $localStorage) {

	$scope.init = function () {

		$scope.storage = $localStorage.$default({
			todoLists: []
		});
		$scope.showTasks = false;
	};

	$scope.getAmountOfDoneTasks = function (todoList) {

		var amount = 0;

		angular.forEach(todoList.tasks, function (task) {

			if(task.done)
				amount++;
		});

		return amount;
	};

	$scope.deleteList = function (index) {

		$scope.storage.todoLists.splice(index, 1);
	};

	$scope.deleteTask = function (tasks, index) {

		tasks.splice(index, 1);
	};

	$scope.addList = function () {

		if($scope.newList !== undefined && $scope.newList !== "") {

			$scope.storage.todoLists.push({
				name: $scope.newList,
				tasks: []
			});

			$scope.newList = "";
		}
	};
});

myApp.controller("TaskController", function ($scope) {

	$scope.addTask = function (tasks) {

		if($scope.newTask !== undefined && $scope.newTask !== "") {

			tasks.push({
				text: $scope.newTask,
				done: false
			});

			$scope.newTask = "";
		}
	};
});