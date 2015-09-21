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

      $urlRouterProvider.otherwise('/login');

      $stateProvider

        .state('login', {
          url: '/login',
          templateUrl: 'templates/Login/logInTmpl.html',
          controller: 'LoginCtrl',
          data: {
            title: 'Login'
          }
        })

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
              templateUrl: 'templates/Main/left.html',
              controller: 'LeftPanelCtrl'
            },
            right: {
              templateUrl: 'templates/Main/right.html'
            },
            content: {
              templateUrl: 'templates/Main/content.html'
            },
            footer: {
              templateUrl: 'templates/Main/footer.html'
            }
          },
          data: {
            title: 'Main'
          }
        })

        .state('main.layout.contacts', {
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
        .state('main.layout.projects', {
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
          controller: 'ProjectsCtrl',
          data: {
            title: 'Add person'
          }
        })
        .state('main.layout.persons', {
          url: '/persons',
          templateUrl: 'templates/Persons/get/PersonsTmpl.html',
          controller: 'PersonsCtrl',
          data: {
            title: 'Persons'
          }
        })
        .state('addPerson', {
          url: '/persons',
          templateUrl: 'templates/Persons/PersonAddTmpl.html',
          controller: 'PersonsCtrl'
        })
        .state('main.layout.tasks', {
          url: '/tasks',
          templateUrl: 'templates/Tasks/get/TasksTmpl.html',
          controller: 'TasksCtrl',
          data: {
            title: 'Tasks'
          }
        });
    });
})();
