'use strict';
(function () {

  let _$http;
  let _monoService;

  class MonolistComponent {
    constructor($http, monoService) {
      this.message = 'Hello';
      _$http = $http;
      _monoService = monoService;
      this.images =[];
       _monoService.getAll()
       .then(result=>{
         this.images = result.data;
         console.log ('Displaying first time...');
         console.log (result.data);
       })
    }

    uploadImage() {

      /*      _$http.post('/api/monosvc', {
                    imageName: this.imageName,
                  })
                    .success(res => {
                      console.log('Post successfully worked ! ');
                      return _$http.get('/api/monosvc');
                    })
                    .success(x => {
                      console.log('Data retrieved ');
                      console.log(x);
                    });*/

      /*_$http.get('/api/monosvc')
        .success(x => {
          console.log('Data retrieved ');
          console.log(x);
        });*/

      _monoService.uploadImage(this.imageName)
        .then(() => {
          return _monoService.getAll();
        })
        .then((data) => {
          console.log('Data retrieved !!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
          console.log(data);
          this.images = data;
        })

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
