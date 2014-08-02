var myApp = angular.module("myApp", ["ngStorage", "ngAnimate"]);

myApp.controller("myAppController", function ($scope, $localStorage) {

	$scope.init = function () {

		$scope.storage = $localStorage.$reset({
			todoLists: [{
				active: false,
				name: "Departamento",
				tasks: [{
					description: "Llamar a Mónica",
					done: true
				}, {
					description: "Ir a ver el departamento",
					done: true
				}]
			}, {
				active: false,
				name: "3p",
				tasks: [{
					description: "Llamar a Ricky",
					done: false
				}]
			}, {
				active: false,
				name: "Vacaciones",
				tasks: []
			}]
		});
	};

	$scope.addTodoList = function () {

		var newTodoListName = $scope.newTodoListName;

		if(newTodoListName) {

			$scope.storage.todoLists.push({
				name: newTodoListName,
				tasks: []
			});

			$scope.newTodoListName = "";
		}
	};

	$scope.showPercentage = function (todoList) {

		var tasksCount = todoList.tasks.length;
		var doneTasks = todoList.tasks.filter(function (task) {
			return task.done;
		});

		if(tasksCount > 0) {

			if(doneTasks.length > 0) {

				// Percentage of done tasks
				var percentage = (100 * doneTasks.length) / tasksCount;
				return percentage.toFixed(0);
			} else {

				// There is no done tasks
				return 0;
			}

		} else {

			// There is no tasks
			return false;
		}
	};

	$scope.showTodoList = function (todoList) {

		angular.forEach($scope.storage.todoLists, function (list) {

			if(list.name !== todoList.name) {

				list.active = false;
			}
		});

		todoList.active = !todoList.active;
	};
});