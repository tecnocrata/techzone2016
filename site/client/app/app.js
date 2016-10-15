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
                .url('ws://localhost:15674/ws') // previously _ or http://localhost:15674/stomp, doesn't work with /ws only
                .credential('guest', 'guest')
                .vhost('/')
                //.debug(true);

    //Working with sockjs but recomended for old browsers only
    /*ngstompProvider
                .url('http://localhost:15674/stomp') // doesn't work with ws://localhost:15674/ws or /ws
                .credential('abx-admin', 'abx01')
                .vhost('/')
                .class(SockJS)
                .debug(true);*/
              
    //Working with web sockets with guest user, I have created the user not sure if work without it
    /*ngstompProvider
                .url('ws://localhost:15674/ws') // previously _ or http://localhost:15674/stomp, doesn't work with /ws only
                .credential('guest', 'guest')
                .vhost('/')
                .debug(true);   */
  });
