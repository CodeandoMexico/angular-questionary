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
        var name = args.name;
        var email = args.email;
        var password = args.password;
        var passwordConfirmation = args.passwordConfirmation;
        var address = this.backendAddress;

        var authenticityToken = $cookies.csrftoken;
        console.log('cookies');
        console.log($cookies);
        console.log('authenticityToken: ' + authenticityToken);

        return $http.get(this.backendAddress + 'sign_up/').
        success(function(data, status, headers, config) {
          return $http.post(address, {
            'authenticity_token': authenticityToken,
            'user[name]': name,
            'user[email]': email,
            'user[password]': password,
            'user[password_confirmation]': passwordConfirmation,
            'commit': 'Sign up'
          });

        }).
        error(function(data, status, headers, config) {
          console.log('Error: ' + status);
        });
      },
    };
  }]);
