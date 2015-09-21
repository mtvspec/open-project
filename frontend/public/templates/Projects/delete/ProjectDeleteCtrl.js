(function(){
  'use strict';

  angular.module('app')
    .controller('ProjectDeleteCtrl', ProjectDeleteCtrl);

  function ProjectDeleteCtrl($scope, ProjectsModel, project){
    $scope.forms = {};
    $scope.projectToDelete = project;

    $scope.submit = submit;

    function submit(){
      ProjectsModel.remove($scope.projectToDelete).then(function(){
        $scope.$close();
      })
    }

  }

})();