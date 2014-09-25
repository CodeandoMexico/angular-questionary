'use strict';

/**
 * @ngdoc service
 * @name questionaryApp.fondesoUser
 * @description
 * # fondesoUser
 * Service in the questionaryApp.
 */
angular.module('questionaryApp')
  .service('FondesoUser', ['$http', '$cookies', function fondesoUser($http, $cookies) {
    return {
      backendAddress: 'http://localhost:3000/users',
      current: null,
      validateLogin: function ( data ) {
        return angular.isObject( data );
      },
      userIsLoggedIn: function(){
        var address = this.backendAddress + '/current';
        return $http.get(address);
      },
      logIn: function(args){
        var address = this.backendAddress + '/sign_in';
        console.log('arguments');
        console.log(args);

        var authenticityToken = $cookies['XSRF-TOKEN'];
        return $http.post(address + '.json', {
          'authenticity_token': authenticityToken,
          'user': {
            'email': args.email,
            'password': args.password,
            'remember_me': 0
          },
          'commit': 'Sign in'
        });
      },
      logOut: function(){
        return ;
      },
      create: function(args){
        var address = this.backendAddress;

        var authenticityToken = $cookies['XSRF-TOKEN'];
        return $http.post(address + '.json', {
          'authenticity_token': authenticityToken,
          'user': {
            'name': args.name,
            'email': args.email,
            'password': args.password,
            'password_confirmation': args.passwordConfirmation
          },
            'commit': 'Sign up'
        });
      },
    };
  }]);
