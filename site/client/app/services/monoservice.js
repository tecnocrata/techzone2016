/*'use strict';
(function () {
    let _$http;
    //let endPointUrl = 'http://localhost:9000/api/f9/users';
    let _HandleError;
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
    }

    UsersService.$inject = ['$http'];
    angular.module('techzoneApp')
        .service('monoService', UsersService);

})();*/

