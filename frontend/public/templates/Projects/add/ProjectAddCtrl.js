(function(){
  'use strict';

  angular.module('app')
    .controller('ProjectAddCtrl', ProjectAddCtrl);

    function ProjectAddCtrl($scope, $http){

      $scope.forms = {};
      $scope.projectToAdd = {};

      $scope.hasError = hasError;
      $scope.submit = submit;

      function hasError(field){
        var field = $scope.forms.addProjectForm[field];
        if(field){
          return field.$invalid && ($scope.addProjectForm.$submitted || !field.$pristine);
        }
      }

      function submit(){
        $scope.forms.addProjectForm.$setSubmitted();
        console.log('ProjectToAdd:', $scope.projectToAdd);
        if($scope.forms.addProjectForm.$valid){
          $http({
            method: 'POST',
            url: '/api2/projects',
            data: $scope.projectToAdd
          }).then(function(response){
            var result = response;
            console.log('Response:', result);
            $scope.projectToAdd.push(response);
            console.log('ProjectToAdd:', $scope.projectToAdd);
            $scope.$close($scope.projectToAdd);
          }), function(response){
            console.error('POST project:',
              response.status,
              response.statusText);
          };
        }
      }
    }
})();