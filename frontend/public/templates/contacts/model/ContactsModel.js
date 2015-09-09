(function(){
  'use strict';

  angular.module('app')
    .factory('ContactsModel', ContactsModel);

  function ContactsModel($http){

    var _url = '/api/contacts';

    var _contactsPromise;

    return {
      getAll: getAll
    };

    function getAll(){
      if(_contactsPromise){
        return _contactsPromise;
      } else {
        _contactsPromise = $http({
          method: 'GET',
          url: _url
        }).then(function(response){

        });
        return _contactsPromise;
      };
    };
  };
})();
