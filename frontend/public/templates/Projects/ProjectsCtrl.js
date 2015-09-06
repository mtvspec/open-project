angular.module('app')
  .controller('ProjectsCtrl', function($scope, $http){
    $scope.projects = {};

    // GET all projects
    $http.get('/api/projects')
      .success(function(data){
        $scope.projects = data;
        console.log(data);
      })
      .error(function(error){
        console.log('GET all projects:', error);
      });
  });