(function(){
  'use strict';

  angular.module('app')
    .controller('LeftPanelCtrl', LeftPanelCtrl);

  function LeftPanelCtrl($scope, ProjectsModel){

    console.log('LeftPanelCtrl');

    ProjectsModel.getAllProjects().then(function(projects){
      console.log(projects);
      $scope.projects = projects;
    })
  }
})();