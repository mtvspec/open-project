(function(){
  'use strict';

  angular.module('app')
    .factory('PersonsModel', PersonsModel);

  function PersonsModel($http){

    var _url = '/api/persons/';

    var _persons = [];
    var _personsPromise;

    return {
      create: function(data){
        return $http({
          method: 'POST',
          url: _url,
          data: data
        }).then(function(response){
          data.id = response.data.id;
          _persons.push(data);
        }, function(response){
          console.error('Create new person:', response.status.statusText);
        });
      },
      getAll: function(){
        return $http({
          method: 'GET',
          url: _url
        }).then(function (response) {
          return response.data;
        }, function(response){
          console.error('Get all persons:', response.status.statusText);
        })
      },
      save: function(data){ // TODO Update this function
        return $http({
          method: 'PUT',
          url: _url + data.id,
          data: data
        }).then(function(){
          var i, len;
          for(i = 0, len = _persons.length; i < len; i++){
            if(_persons[i].id === data.id){
              _persons[i].taskName = data.taskName;
              _persons[i].taskDescription = data.taskDescription;
              break;
            }
          }
        }, function(response){
          console.error('Save person:', response.status.statusText);
        });
      },
      remove: function(data){
        return $http({
          method: 'DELETE',
          url: _url + data.id
        }).then(function(){
          var i, len;
          for(i = 0, len = _persons.length; i < len; i++){
            if(_persons[i].id === data.id){
              _persons.splice(i, 1);
              break;
            }
          }
        }, function(response){
          console.error('Remove person:', response.status.statusText);
        })
      },
      info: function(data){
        return $http({
          method: 'GET',
          url: _url + data.id
        }).then(function (response) {
          return response.data;
        }, function(response){
          console.error('Get person info:', response.status.statusText);
        })
      },
      getAllPersons: function getAllPersons(){
        if(_personsPromise){
          return _personsPromise;
        } else {
          _personsPromise = $http({
            method: 'GET',
            url: _url
          }).then(function(response){
            var i, len;
            for (i = 0, len = response.data.length; i < len; i++){
              _persons.push(response.data[i]);
            }
            return _persons;
          }, function(response){
            console.error('Get all persons (promise):', response.status.statusText);
          });
          return _personsPromise;
        }
      }
    };
  }
})();
