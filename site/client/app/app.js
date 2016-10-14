'use strict';

angular.module('techzoneApp', [
  'techzoneApp.constants',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap',
  'AngularStompDK'
])
  .config(function($urlRouterProvider, $locationProvider, ngstompProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
    ngstompProvider
                .url('ws://localhost:15674/ws') // previously /ws
                .credential('guest', 'guest')
  });
