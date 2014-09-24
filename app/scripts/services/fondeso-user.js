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
      backendAddress: 'http://localhost:3000/users/',
      current: null,
      userIsLoggedIn: function(){
        var address = this.backendAddress + 'current/';
        return $http.get(address);
      },
      session: function(user){
        return ;
      },
      logIn: function(email, password){
        return ;
      },
      logOut: function(){
        return ;
      },
      create: function(args){
        // var name = args.name;
        // var email = args.email;
        // var password = args.password;
        // var passwordConfirmation = args.passwordConfirmation;
        var address = this.backendAddress;
        // console.log(email);


        return $http.get(this.backendAddress + 'sign_up/').
        success(function(data, status, headers, config) {
          var authenticityToken = $cookies['XSRF-TOKEN'];
          return $http.post(address, {
            'authenticity_token': authenticityToken,
            'user': {
              'name': args.name,
              'email': args.email,
              'password': args.password,
              'password_confirmation': args.passwordConfirmation,
              'commit': 'Sign up'
            }
          });

        }).
        error(function(data, status, headers, config) {
          console.log('Error: ' + status);
        });
      },
    };
  }]);
