(function(){
  'use strict';

  angular.module('app')
    .controller('TasksCtrl', function($scope, $http, $modal, TasksModel) {

      // GET all tasks
      TasksModel.getAllTasks().then(function(tasks){
        $scope.tasks = tasks;
      });

      // Add new task
      $scope.addTask = function() {
        $modal.open({
          templateUrl: 'templates/Tasks/add/TaskAddTmpl.html',
          controller: 'TaskAddCtrl',
          size: 'md'
        });
      };

      // Show task info
      $scope.showTaskInfo = function(taskInfo){
        $modal.open({
          templateUrl: 'templates/Tasks/info/TaskInfoTmpl.html',
          controller: 'TaskInfoCtrl',
          resolve: {
            task: function(){
              return taskInfo;
            }
          },
          size: 'md'
        });
      };

      // Edit task
      $scope.editTask = function(taskToEdit) {
        $modal.open({
          templateUrl: '/templates/Tasks/edit/TaskEditTmpl.html',
          controller: 'TaskEditCtrl',
          resolve: {
            originalTask: function(){
              return taskToEdit;
            }
          },
          size: 'md'
        });
      };

        // Delete task
        $scope.deleteTask = function(taskToDelete){
          $modal.open({
            templateUrl: 'templates/Tasks/delete/TaskDeleteTmpl.html',
            controller: 'TaskDeleteCtrl',
            resolve: {
              task: function(){
                return taskToDelete;
              }
            },
            size: 'md'
          });
        };

    });
})();