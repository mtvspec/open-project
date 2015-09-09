(function(){
  'use strict';

  angular.module('app')
    .controller('TasksCtrl', function($scope, $http, $modal) {

      $scope.task = {};

      // Get all tasks
      $http({
        method: 'GET',
        url: '/api/tasks'
      }).then(function(response){
        $scope.tasks = response.data;
      }, function (response) {
        console.error('GET all tasks: ', response.status, response.statusText);
      });

      // Add task
      $scope.addTask = function() {
        var modalInstance = $modal.open({
          templateUrl: 'templates/Tasks/add/TaskAddTmpl.html',
          controller: 'TaskAddCtrl',
          size: 'md'
        });

        modalInstance.result.then(function(result){
          console.debug('SUCCESS: ', result);
        });
      };

      // Edit task
      $scope.editTask = function(task){
        var modalInstance = $modal.open({
          templateUrl: '/templates/Tasks/edit/TaskEditTmpl.html',
          controller: 'TaskEditCtrl',
          resolve: {
            originalTask: function () {
              return task;
            }
          },
          size: 'md'
        });

        modalInstance.result.then(function (result) {
          console.debug('SUCCESS: ', result);
        });

        // Delete task
        $scope.deleteTask = function(taskCopy){
          var modalInstance = $modal.open({
            templateUrl: 'templates/Tasks/delete/TaskDeleteTmpl.html',
            controller: 'TaskDeleteCtrl',
            resolve: {
              task: function(){
                return taskCopy;
              }
            },
            size: 'md'
          });

          modalInstance.result.then(function(result){
            console.debug('SUCCESS: ', result);
          });
        };

      };
    });
})();