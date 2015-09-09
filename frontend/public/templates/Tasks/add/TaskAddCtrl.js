(function(){
  'use strict';

  angular.module('app')
    .controller('TaskAddCtrl', TaskAddCtrl);

    function TaskAddCtrl($scope, $http){

      $scope.forms = {};
      $scope.taskToAdd = {};

      $scope.hasError = hasError;
      $scope.submit = submit;

      function hasError(field){
        var field = $scope.forms.addTaskForm[field];
        if(field){
          return field.$invalid && ($scope.forms.addTaskForm.$submitted || !field.$pristine);
        }
      };

    function submit(){
      $scope.forms.addTaskForm.$setSubmitted();
      if($scope.forms.addTaskForm.$valid){
        $http({
          method: 'POST',
          url: '/api/tasks',
          data: {
            taskName: $scope.taskToAdd.taskName
          }
        }).then(function(){
          $scope.$close('SUCCESS');
        }), function(response){
          console.error('POST task:',
            response.status,
            response.statusText);
        };
      };
    };
  };
})();
