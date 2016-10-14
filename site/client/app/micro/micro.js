'use strict';

angular.module('techzoneApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('micro', {
        url: '/micro',
        template: '<micro></micro>'
      });
  });
