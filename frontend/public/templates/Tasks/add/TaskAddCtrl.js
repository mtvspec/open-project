(function(){
  'use strict';

  angular.module('app')
    .controller('TaskAddCtrl', TaskAddCtrl);

    function TaskAddCtrl($scope, $http, $modal, task){

      console.debug(task);

      $scope.forms = {};
      $scope.task = task;

      $scope.hasError = hasError;
      $scope.submit = submit;

      function hasError(field){
        var field = $scope.forms.addTaskForm[field];
        if(field){
          return field.$invalid && ($scope.forms.addTaskForm.$submitted || !field.$pristine);
        }
      };

    $scope.addTask = function(task){
      var modalInstance = $modal.open({
        templateUrl: 'templates/Tasks/TaskAddTmpl.html',
        controller: 'TaskEditCtrl',
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

    function submit(){
      $scope.forms.addTaskForm.$setSubmitted();
      if($scope.forms.addTaskForm.$valid){
        $http({
          method: 'POST',
          url: '/api/tasks',
          data: {
            taskname: task.taskname
          }
        }).then(function(){
          $scope.$close('SUCCESS');
        }), function(response){
          console.error('POST task:', response.status, response.statusText);
        };
      };
    };
  };
})();
