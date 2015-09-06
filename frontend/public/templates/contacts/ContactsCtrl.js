angular.module('app')
  .controller('ContactsCtrl', function($scope, $http){
    $scope.contacts = {};

    // GET all contacts
    $http.get('/api/contacts')
      .success(function(data){
        $scope.contacts = data;
        console.log(data);
      })
      .error(function(error){
        console.log('GET all contacts error:', error);
      });
  });