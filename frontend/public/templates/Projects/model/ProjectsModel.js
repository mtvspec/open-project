(function(){
  'use strict';

  angular.module('app')
    .factory('ProjectsModel', ProjectsModel);

  function ProjectsModel($http){

    var _url = '/api/projects';
    var _projectsPromise;

    return {
      getAllProjects: getAllProjects
    };

    function getAllProjects(){
      if(_projectsPromise){
        return _projectsPromise;
      } else {
        _projectsPromise = $http({
          method: 'GET',
          url: _url
        }).then(function(response){

        });
        return _projectsPromise;
      };
    };
  };
})();
