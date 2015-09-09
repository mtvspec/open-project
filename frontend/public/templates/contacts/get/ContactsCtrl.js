(function(){
  'use strict';

  // TODO: Rewrite contacts (based on projects, persons and members entities)

  angular.module('app')
    .controller('ContactsCtrl', function($scope, $http, ContactsModel){
      $scope.contacts = {};

      // GET all contacts
      ContactsModel.getAll().then(function (contacts) {
        $scope.contacts = contacts;
      }, function (response) {
        console.log('Error', response.status);
      });
      $http.get('/api/contacts')
        .success(function(data){
          $scope.contacts = data;
        })
        .error(function(error){
          console.log('GET all contacts error:', error);
        });

      // POST new contact
      $scope.addContact = function(){
        $http.post('/api/contacts', $scope.formData)
          .success(function(data){
            $scope.formData = {};
            $scope.contacts = data;
          })
          .error(function(error){
            console.log('POST contact error:', error);
          });
      };

      // DELETE contact
      $scope.deleteContact = function(contactID) {
        $http.delete('/api/contacts/' + contactID)
          .success(function(data) {
            $scope.contacts = data;
          })
          .error(function(error) {
            console.log('DELETE contact error:', error);
          });
      };
    });
})();
