(function(){
  'use strict';

  angular.module('app')
    .controller('TaskDeleteCtrl', TaskDeleteCtrl);

    function TaskDeleteCtrl($scope, TasksModel, task){

      $scope.forms = {};
      $scope.taskToDelete = task;

      $scope.submit = submit;

      function submit(){
        TasksModel.remove($scope.taskToDelete).then(function(){
          $scope.$close();
        })
      }
    }
})();