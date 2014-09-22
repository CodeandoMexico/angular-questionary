'use strict';

/**
 * @ngdoc service
 * @name questionaryApp.fondesoUser
 * @description
 * # fondesoUser
 * Service in the questionaryApp.
 */
angular.module('questionaryApp')
  .service('FondesoUser', function fondesoUser() {
    return {
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

        console.log(name + ' ' + email + ' ' + password + ' ' + passwordConfirmation);
        return ;
      },
    };
  });
