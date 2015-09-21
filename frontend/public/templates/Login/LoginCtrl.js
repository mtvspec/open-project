(function(){
  'use strict';

  angular.module('app')
    .controller('LoginCtrl', LoginCtrl);

  function LoginCtrl($scope, $http, $state){
    $scope.user = {};
    $scope.forms = {};

    $scope.logIn = function(user){
      $http({
        method: 'GET',
        url: '/api/user',
        data: {
          username: user.username,
          password: user.password
        }
      }).then(function(response){
        var id = Number(response.data.id);
        switch(id){
          case 0:
            $scope.message = 'User not found';
            break;
          default:
            if(angular.isNumber(id)){
              $state.go('main.layout');
            } else {
              $scope.message = 'Error';
            }
        }
      }), function(response){
        console.error(response);
      }
    };
    $scope.logOut = function(){
      $state.go('login');
    }
  }
})();