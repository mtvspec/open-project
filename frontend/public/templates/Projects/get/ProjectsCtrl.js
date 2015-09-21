(function(){
  'use strict';

  angular.module('app')
    .controller('ProjectsCtrl', function($scope, $modal, ProjectsModel){

      // GET all projects
      ProjectsModel.getAllProjects().then(function(projects){
        $scope.projects = projects;
      });

      // Add new project
      $scope.addProject = function(){
        $modal.open({
          templateUrl: 'templates/Projects/add/ProjectAddTmpl.html',
          controller: 'ProjectAddCtrl',
          size: 'md'
        });
      };

      // Show project info
      $scope.showProjectInfo = function(projectInfo){
        $modal.open({
          templateUrl: 'templates/Tasks/info/TaskInfoTmpl.html',
          controller: 'ProjectInfoCtrl',
          resolve: {
            project: function(){
              return projectInfo;
            }
          },
          size: 'md'
        });
      };

      // Edit project
      $scope.editProject = function(projectToEdit){
        $modal.open({
          templateUrl: 'templates/Projects/edit/ProjectEditTmpl.html',
          controller: 'ProjectEditCtrl',
          resolve: {
            originalProject: function(){
              return projectToEdit;
            }
          },
          size: 'md'
        });
      };

      // Delete project
      $scope.deleteProject = function(projectToDelete){
        $modal.open({
          templateUrl: 'templates/Projects/delete/ProjectDeleteTmpl.html',
          controller: 'ProjectDeleteCtrl',
          resolve: {
            project: function(){
              return projectToDelete;
            }
          },
          size: 'md'
        });
      };

    });
})();
