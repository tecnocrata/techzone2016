'use strict';
(function () {

  let _$http;
  let _monoService;

  class MonolistComponent {
    constructor($http, monoService) {
      this.message = 'Hello';
      _$http = $http;
      _monoService = monoService;
      let connectHeaders = {}; //'guest', 'guest'
      this.images = [];
      _monoService.getAll()
        .then(result => {
          this.images = result.data;
          console.log('Displaying first time...');
          console.log(result.data);
        });
    }

    uploadImage() {

      _monoService.uploadImage(this.imageName)
        .then(() => {
          return _monoService.getAll();
        })
        .then((result) => {
          console.log('Data retrieved !!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
          console.log(result);
          this.images = result.data;
        });
    }
  }

  angular.module('techzoneApp')
    .component('monolist', {
      templateUrl: 'app/mono/monolist/monolist.html',
      controller: MonolistComponent
    });

})();
