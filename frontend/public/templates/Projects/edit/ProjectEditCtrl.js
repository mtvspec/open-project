(function(){
  'use strict';

  angular.module('app')
    .controller('ProjectEditCtrl', ProjectEditCtrl);

  function ProjectEditCtrl($scope, ProjectsModel, originalProject){

    $scope.forms = {};
    $scope.projectToEdit = angular.copy(originalProject);

    $scope.hasError = hasError;
    $scope.submit = submit;

    function hasError(fieldName){
      var field = $scope.forms.editProjectForm[fieldName];
      if(field){
        return field.$invalid && ($scope.forms.editProjectForm.$submitted || !field.$pristine);
      }
    }

    function submit(){
      $scope.forms.editProjectForm.$setSubmitted();
      if($scope.forms.editProjectForm.$valid){
        ProjectsModel.save($scope.projectToEdit).then(function(){
          $scope.$close();
        })
      }
    }
  }

})();