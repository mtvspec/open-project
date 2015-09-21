(function(){
  'use strict';

  angular.module('app')
    .controller('ProjectAddCtrl', ProjectAddCtrl);

    function ProjectAddCtrl($scope, ProjectsModel){

      $scope.forms = {};
      $scope.projectToAdd = {};

      $scope.hasError = hasError;
      $scope.submit = submit;

      function hasError(fieldName){
        var field = $scope.forms.addProjectForm[fieldName];
        if(field){
          return field.$invalid && ($scope.addProjectForm.$submitted || !field.$pristine);
        }
      }

      function submit(){
        $scope.forms.addProjectForm.$setSubmitted();
        if($scope.forms.addProjectForm.$valid){
          ProjectsModel.create($scope.projectToAdd).then(function(){
            $scope.$close();
          });
        }
      }
    }
})();