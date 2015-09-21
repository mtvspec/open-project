(function(){
  'use strict';

  angular.module('app')
    .factory('ContactsModel', ContactsModel);

  function ContactsModel($http){

    var _url = '/api/contacts/';

    var _contacts = [];
    var _contactsPromise;

    return {
      create: function(data){
        return $http({
          method: 'POST',
          url: _url,
          data: data
        }).then(function(response){
          data.id = response.data.id;
          _contacts.push(data);
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
      save: function(data){ // TODO update this resource
        return $http({
          method: 'PUT',
          url: _url + data.id,
          data: data
        }).then(function(){
          var i, len;
          for(i = 0, len = _contacts.length; i < len; i++){
            if(_contacts[i].id === data.id){
              _contacts[i].projectName = data.projectName;
              _contacts[i].organizationName = data.organizationName;
              _contacts[i].roleName = data.roleName;
              _contacts[i].lastName = data.lastName;
              _contacts[i].firstName = data.firstName;
              _contacts[i].middleName = data.middleName;
              _contacts[i].workTel = data.workTel;
              _contacts[i].mobileTel = data.mobileTel;
              _contacts[i].email = data.email;
              break;
            }
          }
        }, function(response){
          console.error('UPDATE contact:', response.status.statusText);
        });
      },
      remove: function(data){
        return $http({
          method: 'DELETE',
          url: _url + data.id
        }).then(function(){
          var i, len;
          for(i = 0, len = _contacts.length; i < len; i++){
            if(_contacts[i].id === data.id){
              _contacts.splice(i, 1);
              break;
            }
          }
        }, function(response){
          console.error('DELETE contact:', response.status.statusText);
        })
      },
      info: function(data){
        return $http({
          method: 'GET',
          url: _url + data.id
        }).then(function (response) {
          return response.data;
        }, function(response){
          console.error('GET contact info:', response.status.statusText);
        })
      },
      getAllContacts: function getAllContacts(){
        if(_contactsPromise){
          return _contactsPromise;
        } else {
          _contactsPromise = $http({
            method: 'GET',
            url: _url
          }).then(function(response){
            var i, len;
            for (i = 0, len = response.data.length; i < len; i++){
              _contacts.push(response.data[i]);
            }
            return _tasks;
          }, function(response){
            console.error('GET contacts promise:', response.status.statusText);
          });
          return _contactsPromise;
        }
      }
    };
  }
})();
