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
                .url('http://localhost:15674/stomp') // previously ws://localhost:15674/ws or /ws or 
                .credential('abx-admin', 'abx01')
                .vhost('/')
                .class(SockJS)
                .debug(true);
  });
