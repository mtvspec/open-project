(function () {
  'use strict';

  angular.module('app')
    .controller('PersonEditCtrl', PersonEditCtrl);

  function PersonEditCtrl($scope, PersonsModel, originalPerson) {

    $scope.forms = {};
    $scope.personToEdit = angular.copy(originalPerson);

    $scope.hasError = hasError;
    $scope.submit = submit;

    function hasError(fieldName) {
      var field = $scope.forms.editPersonForm[fieldName];
      if (field) {
        return field.$invalid && ($scope.forms.editPersonForm.$submitted || !field.$pristine);
      }
    }

    function submit() {
      $scope.forms.editPersonForm.$setSubmitted();
      if($scope.forms.editPersonForm.$valid){
        PersonsModel.save($scope.personToEdit).then(function(){
          $scope.$close();
        })
      }
    }
  }

})();
