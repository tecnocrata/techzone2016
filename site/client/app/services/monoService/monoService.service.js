'use strict';
(function () {
  let _$http;
  class UsersService {
    constructor($http) {
      _$http = $http;
    }
    getAll() {
      return _$http.get('/api/monosvc')
        .success(x => {
          console.log('Data retrieved ');
          console.log(x);
        });
    }

    uploadImage(imageName) {
      return _$http.post('/api/monosvc', {
        imageName: imageName
      })
        .success(res => {
          console.log('Post successfully worked ! ');
        });
    }
  }

  UsersService.$inject = ['$http'];
  angular.module('techzoneApp')
    .service('monoService', UsersService);

})();