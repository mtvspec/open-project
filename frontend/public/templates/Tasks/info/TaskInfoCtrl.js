(function(){
  'use strict';

  angular.module('app')
    .controller('TaskInfoCtrl', TaskInfoCtrl);

    function TaskInfoCtrl($scope, TasksModel, task){
      $scope.forms = {};
      $scope.taskInfo = task;

      TasksModel.info($scope.taskInfo).then(function(){

      })
    }

})();