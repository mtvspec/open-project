(function(){
  'use strict';

  angular.module('app', ['ui.bootstrap', 'ui.router'])
    .config(function($stateProvider, $urlRouterProvider){

      $urlRouterProvider.otherwise('/');

      $stateProvider
        .state('main', {
          url: '/',
          templateUrl: 'templates/main.html'
        })
        .state('contacts', {
          url: '/contacts',
          templateUrl: 'templates/Contacts/get/ContactsTmpl.html',
          controller: 'ContactsCtrl'
        })
        .state('addContact', {
          url: '/contacts',
          templateUrl: 'templates/Contacts/add/ContactAddTmpl.html',
          controller: 'ContactsCtrl'
        })
        .state('projects', {
          url: '/projects',
          templateUrl: 'templates/Projects/get/ProjectsTmpl.html',
          controller: 'ProjectsCtrl'
        })
        .state('addProject', {
          url: '/projects',
          templateUrl: 'templates/Projects/add/ProjectAddTmpl.html',
          controller: 'ProjectsCtrl'
        })
        .state('persons', {
          url: '/persons',
          templateUrl: 'templates/Persons/PersonsTmpl.html',
          controller: 'PersonsCtrl'
        })
        .state('addPerson', {
          url: '/persons',
          templateUrl: 'templates/Persons/PersonAddTmpl.html',
          controller: 'PersonsCtrl'
        })
        .state('tasks', {
          url: '/tasks',
          templateUrl: 'templates/Tasks/get/TasksTmpl.html',
          controller: 'TasksCtrl'
        });
    });
})();
