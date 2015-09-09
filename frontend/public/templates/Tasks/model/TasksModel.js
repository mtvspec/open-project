(function(){
  'use strict';

  angular.module('app')
    .factory('TasksModel', TasksModel);

  function TasksModel($http){

    var _url = '/api/tasks';

    var _tasks = [];
    var _tasksPromise;

    return {
      getAllTasks: getAllTasks
    };

    function getAllTasks(){
      if(_tasksPromise){
        return _tasksPromise;
      } else {
        _tasksPromise = $http({
          method: 'GET',
          url: _url
        }).then(function(response){
          var i, len;
          for (i = 0, len = response.data.length; i < len; i++){
            _tasks.push({
              id: response.data[i].taskname.toUpperCase()
            });
          }
          return _tasks;
        });
        return _tasksPromise;
      };
    };
  };
})();
