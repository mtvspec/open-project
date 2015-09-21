(function(){
  'use strict';

  angular.module('app')
    .controller('PersonAddCtrl', PersonAddCtrl);

  function PersonAddCtrl($scope, PersonsModel){

    $scope.forms = {};
    $scope.personToAdd = {};

    $scope.hasError = hasError;
    $scope.submit = submit;

    function hasError(fieldName){
      var field = $scope.forms.addPersonForm[fieldName];
      if(field){
        return field.$invalid && ($scope.forms.addPersonForm.$submitted || !field.$pristine);
      }
    }

    function submit(){
      $scope.forms.addPersonForm.$setSubmitted();
      if($scope.forms.addPersonForm.$valid){
        PersonsModel.create($scope.personToAdd).then(function(){
          $scope.$close();
        });
      }
    }
  }
})();
