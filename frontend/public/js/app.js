(function(){
  'use strict';

  angular.module('app', ['ui.bootstrap', 'ui.router'])
    .run(function ($rootScope) {
      $rootScope.$on('$stateChangeSuccess', function (evt, toState) {
        if (toState.data && toState.data.title) {
          $rootScope.APP_TITLE = toState.data.title;
        }
        else {
          throw new Error('No title specified in state "' + toState.name + '"');
        }
      });
    })
    .config(function($stateProvider, $urlRouterProvider){

      $urlRouterProvider.otherwise('/');

      $stateProvider
        /*
        .state('main', {
          url: '/',
          title: 'Main',
          templateUrl: 'templates/root.html',
          views: {
            header: {
              templateUrl: 'templates/Main/header.html', // Tools select panel
              controller: 'HeaderCtrl'
            },
            left: {
              templateUrl: 'templates/Main/left.html', // Project select panel
              controller: 'LeftPanelCtrl'
            },
            right:{
              templateUrl: 'templates/Main/right.html', // Details
              controller: 'RightPanelCtrl'
            },
            main: {
              templateUrl: 'templates/Main/root.html', // Main content
              controller: 'MainCtrl'
            },
            footer: {
              templateUrl: 'templates/Main/footer.html', // Footer panel
              controller: 'FooterCtrl'
            }
          }
        })
        */
        .state('main', {
          abstract: true,
          templateUrl: 'templates/root.html'
        })
        .state('main.layout', {
          url: '/',
          views: {
            header: {
              templateUrl: 'templates/Main/header.html'
            },
            left: {

            }
          },
          data: {
            title: 'Main'
          }
        })
        .state('contacts', {
          url: '/contacts',
          templateUrl: 'templates/Contacts/get/ContactsTmpl.html',
          controller: 'ContactsCtrl',
          data: {
            title: 'Contacts'
          }
        })
        .state('addContact', {
          url: '/contacts',
          templateUrl: 'templates/Contacts/add/ContactAddTmpl.html',
          controller: 'ContactsCtrl',
          data: {
            title: 'Add Contact'
          }
        })
        .state('projects', {
          url: '/projects',
          title: 'Projects',
          templateUrl: 'templates/Projects/get/ProjectsTmpl.html',
          controller: 'ProjectsCtrl',
          data: {
            title: 'Projects'
          }
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
