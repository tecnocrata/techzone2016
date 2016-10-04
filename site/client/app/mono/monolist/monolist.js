'use strict';

angular.module('techzoneApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('monolist', {
        url: '/monolist',
        template: '<monolist></monolist>'
      });
  });
