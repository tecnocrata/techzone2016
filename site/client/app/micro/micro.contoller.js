'use strict';
(function () {

  let _$http;
  let _monoService;
  let _$stomp;

  function log(err){
    console.log ('Error ->');
    console.log(err);
  }

  class MicroComponent {
    constructor($http, monoService, $stomp) {
      this.message = 'Hello';
      _$http = $http;
     // _$stomp = $stomp;
      _monoService = monoService;
      let connectHeaders = {}; //'guest', 'guest'
      this.images = [];
      /*_$stomp
        .connect('http://localhost:15674/stomp', connectHeaders, log)
        // frame = CONNECTED headers
        .then(function (frame) {
          var subscription = $stomp.subscribe('/dest', function (payload, headers, res) {
            $scope.payload = payload
          }, {
              'headers': 'are awesome'
            })

          // Unsubscribe
          subscription.unsubscribe()

          // Send message
          $stomp.send('/dest', {
            message: 'body'
          }, {
              priority: 9,
              custom: 42 // Custom Headers
            })

          // Disconnect
          $stomp.disconnect().then(function () {
            $log.info('disconnected')
          })
        });*/

      _monoService.getAll()
        .then(result => {
          this.images = result.data;
          console.log('Displaying first time...');
          console.log(result.data);
        });
    }
  }

  angular.module('techzoneApp')
    .component('micro', {
      templateUrl: 'app/micro/micro.html',
      controller: MicroComponent
    });

})();
