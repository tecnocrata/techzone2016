'use strict';
(function () {

  let _$http;
  let _monoService;
  let _$stomp;

  function log(err) {
    console.log('Error ->');
    console.log(err);
  }

  class MicroComponent {
    constructor($http, monoService, ngstomp) {
      this.message = 'Hello';
      _$http = $http;
      _$stomp = ngstomp;
      console.log(_$stomp);
      _monoService = monoService;
      let connectHeaders = {}; //'guest', 'guest'
      this.images = [];

      ngstomp
        .subscribeTo('/topic/user.notified')
        .callback(updateNotification)
        .connect();

      _monoService.getAll()
        .then(result => {
          this.images = result.data;
          console.log('Displaying first time...');
          console.log(result.data);
        });

      function updateNotification(message) {
        console.log('Este es mi mensaje...');
        //items.push(JSON.parse(message.body));
        //console.log (JSON.parse(message.body));
        console.log(message.body);
      }
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
    .component('micro', {
      templateUrl: 'app/micro/micro.html',
      controller: MicroComponent
    });

})();
