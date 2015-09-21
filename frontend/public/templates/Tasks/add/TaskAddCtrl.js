(function(){
  'use strict';

  angular.module('app')
    .controller('TaskAddCtrl', TaskAddCtrl);

    function TaskAddCtrl($scope, TasksModel){

      $scope.forms = {};
      $scope.taskToAdd = {};

      $scope.hasError = hasError;
      $scope.submit = submit;

      function hasError(fieldName){
        var field = $scope.forms.addTaskForm[fieldName];
        if(field){
          return field.$invalid && ($scope.forms.addTaskForm.$submitted || !field.$pristine);
        }
      }

    function submit(){
      $scope.forms.addTaskForm.$setSubmitted();
      if($scope.forms.addTaskForm.$valid){
        TasksModel.create($scope.taskToAdd).then(function(){
          $scope.$close();
        })
      }
    }
  }
})();
