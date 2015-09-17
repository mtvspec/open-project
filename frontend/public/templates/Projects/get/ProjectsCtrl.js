(function(){
  'use strict';

  angular.module('app')
    .controller('ProjectsCtrl', function($scope, $http, $modal){

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

      // Add new project
      $scope.addProject = function(){
        var modalInstance = $modal.open({
          templateUrl: 'templates/Projects/add/ProjectAddTmpl.html',
          controller: 'ProjectAddCtrl',
          size: 'md'
        });

        modalInstance.result.then(function(result){
          console.log(result);
          $scope.projects.push(result);
        });
      };
      // Edit project
      $scope.editProject = function(){
        var modalInstance = $modal.open({
          templateUrl: 'templates/Projects/edit/ProjectEditTmpl.html',
          controller: 'ProjectEditCtrl',
          size: 'md'
        });

        modalInstance.result.then(function(result){
          console.log(result);
          $scope.projects.push(result);
        })
      };
    });
})();
