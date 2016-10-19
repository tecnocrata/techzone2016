'use strict';
(function () {

  let _$http;
  let _microService;
  let _$stomp;

  function log(err) {
    console.log('Error ->');
    console.log(err);
  }

  class MicroComponent {
    constructor($http, microService, ngstomp) {
      this.message = 'Hello';
      _$http = $http;
      _$stomp = ngstomp;
      console.log(_$stomp);
      _microService = microService;
      let connectHeaders = {}; //'guest', 'guest'
      this.images = [];

      ngstomp
        .subscribeTo('/topic/user.notified')
        .callback((message) => {
          this.updateNotification(message);
        })
        .and()
        .subscribeTo('/topic/image.stars')
        .callback((message) => {
          this.updateStars(message);
        })
        .and()
        .subscribeTo('/topic/image.resized')
        .callback((message) => {
          this.updateResize(message);
        })
        .connect();

      _microService.getAll()
        .then(result => {
          this.images = result.data;
        });
    }

    updateNotification(message) {
      console.log('Notification message arrived...');
      console.log(message.body);
      let item = JSON.parse(message.body);
      let found = false;
      for (let i = 0; i < this.images.length; i++) {
        if (this.images[i]._id === item._id) {
          console.log('Item found: ' + this.images[i]);
          this.images[i].userNotified = true;
          found = true;
          break;
        }
      }

      if (!found) {
        console.log ('Item NOT found and adding....')
        this.images.push(item);
      }
    }

    updateStars(message) {
      console.log('Stars message arrived...');
      console.log(message.body);
      let item = JSON.parse(message.body);
      let found = false;
      for (let i = 0; i < this.images.length; i++) {
        if (this.images[i]._id === item._id) {
          console.log('Item found: ' + this.images[i]);
          this.images[i].stars = item.stars;
          found = true;
          break;
        }
      }

      if (!found) {
        console.log ('Item NOT found and adding....')
        this.images.push(item);
      }
    }

        updateResize(message) {
      console.log('Resized message arrived...');
      console.log(message.body);
      let item = JSON.parse(message.body);
      let found = false;
      for (let i = 0; i < this.images.length; i++) {
        if (this.images[i]._id === item._id) {
          console.log('Item found: ' + this.images[i]);
          this.images[i].resized = true;
          found = true;
          break;
        }
      }

      if (!found) {
        console.log ('Item NOT found and adding....')
        this.images.push(item);
      }
    }

    uploadImage() {
      _microService.uploadImage(this.imageName)
        .then(() => {
          return _microService.getAll();
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
