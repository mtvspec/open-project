(function(){
  'use strict';

  angular.module('app')
    .controller('TaskDeleteCtrl', TaskDeleteCtrl);

  function TaskDeleteCtrl($scope, $http, task){

    $scope.forms = {};
    $scope.task = task;

    $scope.submit = submit;

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

})();