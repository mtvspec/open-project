(function(){
  'use strict';

  angular.module('app')
    .controller('ContactAddCtrl', ContactAddCtrl);

  function ContactAddCtrl($scope, $http, contact){

    console.debug(contact);

    $scope.forms.addContactForm = {};
    $scope.contact = contact;

    $scope.hasError = hasError;

  };
})();