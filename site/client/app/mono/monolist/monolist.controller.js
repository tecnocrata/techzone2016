'use strict';
(function(){

let _$http;

class MonolistComponent {
  constructor($http) {
    this.message = 'Hello';
    _$http = $http;
  }

    uploadImage() {

    _$http.post('/api/monosvc', {
      //do anything you want with your api endpoint here :
      auth_token: '5'
    }).success(function (res) {
      console.log('post successfully worked ! '+res.start);
      //$scope.response = response;
    });
    //call service to 'upload'
    //call service to retrieve the list
    //populate the page
  }
}

angular.module('techzoneApp')
  .component('monolist', {
    templateUrl: 'app/mono/monolist/monolist.html',
    controller: MonolistComponent
  });

})();
