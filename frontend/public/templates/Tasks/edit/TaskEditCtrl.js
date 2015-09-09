(function () {
  'use strict';

  angular.module('app')
    .controller('TaskEditCtrl', TaskEditCtrl);

  function TaskEditCtrl($scope, $http, originalTask) {

    $scope.forms = {};
    $scope.task = angular.copy(originalTask);

    console.log(originalTask);

    $scope.hasError = hasError;
    $scope.submit = submit;

    function hasError(field) {
      var field = $scope.forms.editTaskForm[field];
      if (field) {
        return field.$invalid && ($scope.forms.editTaskForm.$submitted || !field.$pristine);
      }
    };

    function submit() {
      $scope.forms.editTaskForm.$setSubmitted();
      if($scope.forms.editTaskForm.$valid){
        $http({
          method: 'PUT',
          url: '/api/tasks/' + $scope.task.id,
          data: {
            taskname: $scope.task.taskName
          }
        }).then(function(){
          angular.copy($scope.tasks, originalTask);
          $scope.$close('SUCCESS');
        }), function(response){
          console.error('UPDATE task:', response.status, response.statusText);
        };
      };
    };
  };
})();
