(function(){
  'use strict';

  angular.module('app')
    .controller('ContactAddCtrl', ContactAddCtrl);

  function ContactAddCtrl($scope, ContactsModel){

    $scope.forms = {};
    $scope.contactToAdd = {};

    $scope.hasError = hasError;
    $scope.submit = submit;

    function hasError(fieldName){
      var field = $scope.forms.addContactForm[fieldName];
      if(field){
        return field.$invalid && ($scope.forms.addContactForm.$submitted || !field.$pristine);
      }
    }

    function submit(){
      $scope.forms.addContactForm.$setSubmitted();
      if($scope.forms.addContactForm.$valid){
        ContactsModel.create($scope.contactToAdd).then(function(){
          $scope.$close();
        }, function(response){
          console.error('Contact add:', response.status.statusText);
        })
      }
    }
  }
})();