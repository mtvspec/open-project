(function(){
  'use strict';


  angular.module('app')
    .controller('TaskDeleteCtrl', TaskDeleteCtrl);

  function TaskDeleteCtrl($scope, $http, $modal, task){
    console.debug(task);

    $scope.forms = {};
    $scope.task = task;

    $scope.submit = submit;

    $scope.deleteTask = function(taskCopy){
      var modalInstance = $modal.open({
        templateUrl: 'templates/Tasks/TaskDeleteTmpl.html',
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

    function submit(){
        $http({
          method: 'DELETE',
          url: '/api/tasks/' + task.id
        }).then(function(){
          $scope.$close('SUCCESS');
        }), function(response){
          console.error('DELETE task:', response.status, response.statusText);
        };
      };

  };
})