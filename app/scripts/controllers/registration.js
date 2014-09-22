'use strict';

/**
 * @ngdoc function
 * @name questionaryApp.controller:RegistrationCtrl
 * @description
 * # RegistrationCtrl
 * Controller of the questionaryApp
 */
angular.module('questionaryApp')
  .controller('RegistrationCtrl', ['FondesoUser', function (FondesoUser) {
    this.newUser = {
      name: null,
      email: null,
      password: null,
      passwordConfirmation: null
    };

    this.createAccount = function(){
      FondesoUser.create(this.newUser);
    };
  }]);
