'use strict';

/**
 * @ngdoc function
 * @name todoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the todoApp
 */
angular.module('todoApp')
  .controller('MainCtrl', function ($scope, $firebaseArray, $cookies) {

    var ref = firebase.database().ref().child('todos');

    $scope.todos = $firebaseArray(ref);
    $scope.hide = $cookies.get('hide') === 'true' || false;

    $scope.addTodo = function(title) {
      $scope.todos.$add({
        done: false,
        title: title
      });
    };

    $scope.clean = function() {
      $scope.todos.forEach(function(todo) {
        if (todo.done) {
          $scope.todos.$remove(todo);
        }
      });
    };

    $scope.progress = function() {
      return $scope.todos.filter(function(todo) {
        return todo.done;
      }).length / $scope.todos.length * 100;
    };

    $scope.saveHide = function(hide) {
      $cookies.put('hide', hide);
    };

  });
