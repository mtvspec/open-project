(function(){
  'use strict';

  angular.module('app')
    .controller('PersonsCtrl', function($scope, $http, $modal, PersonsModel){

      // Get all persons
      PersonsModel.getAllPersons().then(function(persons){
        $scope.persons = persons;
      });

      // Add new person
      $scope.addPerson = function() {
        $modal.open({
          templateUrl: 'templates/Persons/add/PersonAddTmpl.html',
          controller: 'PersonAddCtrl',
          size: 'md'
        });
      };

      // Show person info
      $scope.showPersonInfo = function(personInfo){
        $modal.open({
          templateUrl: 'templates/Persons/info/PersonInfoTmpl.html',
          controller: 'TaskInfoCtrl',
          resolve: {
            person: function(){
              return personInfo;
            }
          },
          size: 'md'
        });
      };

      // Edit person
      $scope.editPerson = function(personToEdit) {
        $modal.open({
          templateUrl: '/templates/Persons/edit/PersonEditTmpl.html',
          controller: 'PersonEditCtrl',
          resolve: {
            originalPerson: function(){
              return personToEdit;
            }
          },
          size: 'md'
        });
      };

      // Delete person
      $scope.deletePerson = function(personToDelete){
        $modal.open({
          templateUrl: 'templates/Persons/delete/PersonDeleteTmpl.html',
          controller: 'PersonDeleteCtrl',
          resolve: {
            person: function(){
              return personToDelete;
            }
          },
          size: 'md'
        });
      };

    });
})();
