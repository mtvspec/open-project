angular.module('app')
  .controller('PersonsCtrl', function($scope, $http){
    $scope.persons = {};

    // GET all persons
    $http.get('/api/persons')
      .success(function(data){
        $scope.persons = data;
        console.log(data);
      })
      .error(function(error){
        console.log('GET all persons:', error);
      });

    // POST new person
    $scope.addPerson = function(){
      $http.post('/api/persons', $scope.formData)
        .success(function(data){
          $scope.formData = {};
          $scope.persons = data;
          console.log(data);
        })
        .error(function(error){
          console.log(data);
          console.log('POST person error:', error);
        });
    };
  });