(function(){
  'use strict';

  angular.module('app')
    .factory('TasksModel', TasksModel);

  function TasksModel($http){

    var _url = '/api/tasks/';

    var _tasks = [];
    var _tasksPromise;

    return {
      create: function(data){
        return $http({
          method: 'POST',
          url: _url,
          data: data
        }).then(function(response){
          data.id = response.data.id;
          _tasks.push(data);
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
        return $http({
          method: 'PUT',
          url: _url + data.id,
          data: data
        }).then(function(response){
          var i, len;
          for(i = 0, len = _tasks.length; i < len; i++){
            if(_tasks[i].id === data.id){
              _tasks[i].taskName = data.taskName;
              _tasks[i].taskDescription = data.taskDescription;
              break;
            }
          }
        }, function(response){
          console.error('UPDATE task:', response.status.statusText);
        });
      },
      remove: function(data){
        return $http({
          method: 'DELETE',
          url: _url + data.id
        }).then(function(){
          var i, len;
          for(i = 0, len = _tasks.length; i < len; i++){
            if(_tasks[i].id === data.id){
              _tasks.splice(i, 1);
              break;
            }
          }
        }, function(response){
          console.error('DELETE task:', response.status.statusText);
        })
      },
      info: function(data){
        return $http({
          method: 'GET',
          url: _url + data.id
        }).then(function (response) {
          return response.data;
        }, function(response){
          console.error('GET task info:', response.status.statusText);
        })
      },
      getAllTasks: function getAllTasks(){
        if(_tasksPromise){
          return _tasksPromise;
        } else {
          _tasksPromise = $http({
            method: 'GET',
            url: _url
          }).then(function(response){
            var i, len;
            for (i = 0, len = response.data.length; i < len; i++){
              _tasks.push(response.data[i]);
            }
            return _tasks;
          });
          return _tasksPromise;
        }
      }
    };
  }
})();
