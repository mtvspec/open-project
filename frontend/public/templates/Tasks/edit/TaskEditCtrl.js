(function () {
  'use strict';

  angular.module('app')
    .controller('TaskEditCtrl', TaskEditCtrl);

    function TaskEditCtrl($scope, TasksModel, originalTask) {

      $scope.forms = {};
      $scope.taskToEdit = angular.copy(originalTask);

      $scope.hasError = hasError;
      $scope.submit = submit;

      function hasError(fieldName) {
        var field = $scope.forms.editTaskForm[fieldName];
        if (field) {
          return field.$invalid && ($scope.forms.editTaskForm.$submitted || !field.$pristine);
        }
      }

      function submit() {
        $scope.forms.editTaskForm.$setSubmitted();
        if($scope.forms.editTaskForm.$valid){
          TasksModel.save($scope.taskToEdit).then(function(){
            $scope.$close();
          })
        }
      }
    }

})();
