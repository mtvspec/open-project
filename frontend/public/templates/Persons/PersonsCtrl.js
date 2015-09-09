(function(){
  'use strict';

  angular.module('app')
    .controller('PersonsCtrl', function($scope, $http){

      $scope.addPerson = {};
      $scope.forms = {};

      // Get all persons
      $http({
        method: 'GET',
        url: '/api/persons'
      }).then(function (response) {
        $scope.persons = response.data;
      }, function (response) {
        console.error('GET all persons: ', response.status, response.statusText);
      });

      // Add new person
      $scope.addNewPerson = function(){
        $http({
          method: 'POST',
          url: '/api/persons',
          data: $scope.addPerson
        }).then(function(data){
          $scope.persons = {};
          $scope.persons = data;
        }), function(response){
          console.error('POST new person:', response.status, response.statusText);
        };
      };

      // Delete person
      $scope.deletePerson = function(personID){
        $http({
          method: 'DELETE',
          url: '/api/persons/' + personID
        }).then(), function(response){
          console.error('DELETE person:', response.status, response.statusText);
        };
      };

    });
})();
