(function(){
  'use strict';

  // TODO: Rewrite contacts (based on projects, persons and members entities)

  angular.module('app')
    .controller('ContactsCtrl', function($scope, $modal, ContactsModel){
      $scope.contacts = {};

      // GET all contacts
      ContactsModel.getAll().then(function (contacts) {
        $scope.contacts = contacts;
      }, function (response) {
        console.log('Error', response.status.statusText);
      });

      // Add new contact
      $scope.addContact = function(){
        $modal.open({
          templateUrl: 'templates/Contacts/add/ContactAddTmpl.html',
          controller: 'ContactAddCtrl',
          size: 'md'
        })
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
