(function () {
  'use strict';

  angular.module('app')
    .controller('TaskEditCtrl', TaskEditCtrl);

  function TaskEditCtrl($scope, $http, $modal, task) {

    console.debug(task);

    $scope.forms = {};
    $scope.task = task;

    $scope.hasError = hasError;
    $scope.submit = submit;

    function hasError(field) {
      var field = $scope.forms.updateTaskForm[field];
      if (field) {
        return field.$invalid && ($scope.forms.updateTaskForm.$submitted || !field.$pristine);
      }
    };

    // Update task
    $scope.updateTask = function(task){
      var modalInstance = $modal.open({
        templateUrl: '/templates/Tasks/TaskEditTmpl.html',
        controller: 'TaskEditCtrl',
        resolve: {
          task: function () {
            return taskCopy;
          }
        },
        size: 'md'
      });

      modalInstance.result.then(function (result) {
        console.debug('SUCCESS: ', result);
      });
    };

    function submit() {
      $scope.forms.updateTaskForm.$setSubmitted();
      if($scope.forms.updateTaskForm.$valid){
        $http({
          method: 'PUT',
          url: '/api/tasks/' + task.id,
          data: {
            taskname: task.taskname
          }
        }).then(function(){
          $scope.$close('SUCCESS');
        }), function(response){
          console.error('UPDATE task:', response.status, response.statusText);
        };
      };
    };
  };
})();
