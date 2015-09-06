angular.module('app', ['ui.router'])
  .config(function($stateProvider, $urlRouterProvider){

    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'templates/main.html'
      })
      .state('contacts', {
        url: '/contacts',
        templateUrl: 'templates/Contacts/ContactsTmpl.html',
        controller: 'ContactsCtrl'
      })
      .state('projects', {
        url: '/projects',
        templateUrl: 'templates/Projects/ProjectsTmpl.html',
        controller: 'ProjectsCtrl'
      })
      .state('addProject', {
        url: '/projects',
        templateUrl: 'templates/Projects/ProjectAddTmpl.html'
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
      });
  });