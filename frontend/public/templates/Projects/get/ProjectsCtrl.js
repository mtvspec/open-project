(function(){
  'use strict';

  angular.module('app')
    .controller('ProjectsCtrl', function($scope, $http){
      $scope.vm = {};
      $scope.forms = {};

      var _url = '/api/projects';

      // GET all projects
      $http({
        method: 'GET',
        url: _url
      }).then(function(response){
        $scope.projects = response.data;
      }), function(response){
        console.error(
          'GET all projects: ',
          response.status,
          response.statusText);
      };

      // Rewrite with method, is deprecated
      // POST new projects
      $scope.addProject = function(){
        $http.post('/api/projects', $scope.vm)
          .success(function(data){
            $scope.formData = {};
            $scope.projects = data;
          })
          .error(function(error){
            console.log('POST project error:', error);
          });
      };
    });
})();
