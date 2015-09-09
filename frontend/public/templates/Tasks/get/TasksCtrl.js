(function(){
  'use strict';

  angular.module('app')
    .controller('TasksCtrl', function($scope, $http) {

      $scope.task = {};
      $scope.forms = {};

      $http({
        method: 'GET',
        url: '/api/tasks'
      }).then(function(response){
        $scope.tasks = response.data;
      }, function (response) {
        console.error('GET all tasks: ', response.status, response.statusText);
      });

    });
})();