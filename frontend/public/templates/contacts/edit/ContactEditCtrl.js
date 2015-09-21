(function(){
  'use strict';

  angular.module('app')
    .controller('ContactEditCtrl', ContactEditCtrl);

    function ContactEditCtrl($scope, ContactsModel, originalContact){
      $scope.forms = {};
      $scope.contactToEdit = angular.copy(originalContact);

      $scope.hasError = hasError;
      $scope.submit = submit;

      function hasError(fieldName){
        var field = $scope.forms.editContactForm[fieldName];
        if(field){
          return field.$invalid && ($scope.forms.editContactForm.$submitted || !field.$pristine);
        }
      }

      function submit(){
        $scope.forms.editContactForm.$setSubmitted();
        if($scope.forms.editContactForm.$valid){
          ContactsModel.save($scope.contactToEdit).then(function(){
            $scope.$close();
          })
        }
      }
    }


})();