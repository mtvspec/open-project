(function(){
  'use strict';

  angular.module('app')
    .factory('ProjectsModel', ProjectsModel);

  function ProjectsModel($http){

    var _url = '/api/projects/';

    var _projects = [];
    var _projectsPromise;

    return {
      create: function(data){
        return $http({
          method: 'POST',
          url: _url,
          data: data
        }).then(function(response){
          data.id = response.data.id;
          _projects.push(data);
        }, function(response){
          console.error('SELECT all projects:', response.status.statusText);
        });
      },
      getAll: function(){
        return $http({
          method: 'GET',
          url: _url
        }).then(function (response) {
          return response.data;
        })
      },
      save: function(data){
        console.log(data);
        return $http({
          method: 'PUT',
          url: _url + data.id,
          data: data
        }).then(function(){
          var i, len;
          for(i = 0, len = _projects.length; i < len; i++){
            if(_projects[i].id === data.id){
              _projects[i].projectCustomerId = data.projectCustomerId;
              _projects[i].projectFormalName = data.projectFormalName;
              _projects[i].projectName = data.projectName;
              _projects[i].projectDescription = data.projectDescription;
              _projects[i].projectStartDate = data.projectStartDate;
              _projects[i].projectEndDate = data.projectEndDate;
              _projects[i].projectBudget = data.projectBudget;
              _projects[i].projectManagerId = data.projectManagerId;
              break;
            }
          }
        }, function(response){
          console.error('UPDATE project:', response.status.statusText);
        });
      },
      remove: function(data){
        return $http({
          method: 'DELETE',
          url: _url + data.id
        }).then(function(){
          var i, len;
          for(i = 0, len = _projects.length; i < len; i++){
            if(_projects[i].id === data.id){
              _projects.splice(i, 1);
              break;
            }
          }
        }, function(response){
          console.error('DELETE project:', response.status.statusText);
        })
      },
      info: function(data){
        return $http({
          method: 'GET',
          url: _url + data.id
        }).then(function (response) {
          return response.data;
        }, function(response){
          console.error('GET project info:', response.status.statusText);
        })
      },
      getAllProjects: function getAllProjects(){
        if(_projectsPromise){
          return _projectsPromise;
        } else {
          _projectsPromise = $http({
            method: 'GET',
            url: _url
          }).then(function(response){
            console.log(response.data);
            var i, len;
            for (i = 0, len = response.data.length; i < len; i++){
              _projects.push(response.data[i]);
            }
            return _projects;
          }, function(response){
            console.error('GET all projects:', response.status.statusText)
          });
          return _projectsPromise;
        }
      }
    };
  }
})();
