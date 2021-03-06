var myApp = angular.module("myApp", ["ngStorage", "ngAnimate"]);

myApp.controller("myAppController", function ($scope, $localStorage) {
  $scope.init = function () {
    $scope.storage = $localStorage.$default({
      todoLists: []
    });

    angular.forEach($scope.storage.todoLists, function (list) {
      list.active = false;
    });
  };

  $scope.addTodoList = function () {
    var newTodoListName = $scope.newTodoListName;

    if (newTodoListName) {
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

    if (tasksCount > 0) {
      if (doneTasks.length > 0) {
        var percentage = (100 * doneTasks.length) / tasksCount;
        return percentage.toFixed(0);
      } else {
        return 0;
      }
    } else {
      return 0;
    }
  };

  $scope.showTodoList = function (todoList) {
    angular.forEach($scope.storage.todoLists, function (list) {
      if (list.name !== todoList.name) {
        list.active = false;
      }
    });

    todoList.active = !todoList.active;
  };

  $scope.deleteTodoList = function (todoList) {
    var index = $scope.storage.todoLists.indexOf(todoList);
    $scope.storage.todoLists.splice(index, 1);
  };

  $scope.addTask = function (todoList) {
    var newTaskDescription = $scope.newTaskDescription;

    if (newTaskDescription) {
      todoList.tasks.push({
        description: newTaskDescription,
        done: false
      });

      $scope.newTaskDescription = "";
    }
  };

  $scope.deleteTask = function (tasks, index) {
    tasks.splice(index, 1);
  };

  $scope.changeStatus = function (tasks, status) {
    angular.forEach(tasks, function (task) {
      task.done = status;
    });
  };
});