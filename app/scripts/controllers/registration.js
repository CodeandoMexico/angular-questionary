'use strict';

/**
 * @ngdoc function
 * @name questionaryApp.controller:RegistrationCtrl
 * @description
 * # RegistrationCtrl
 * Controller of the questionaryApp
 */
angular.module('questionaryApp')
  .controller('RegistrationCtrl', ['$location', 'FondesoUser', function ($location, FondesoUser) {
    // there is already a logged in user
    if( angular.isObject(FondesoUser.current) ) $location.url('/intro');

    this.newUser = {
      name: null,
      email: null,
      password: null,
      passwordConfirmation: null
    };

    this.createAccount = function( resource, valid ){
        this.submitted = true;
        if ( valid ) createUser( resource );
    };

    // private methods
    var createUser = function( resource ){
      FondesoUser.create( resource ).
      success(function(data, status, headers, config){
        console.log('Success!');
        console.log(status);
        console.log(data);
      }).
      error(function(data, status, headers, config){
        console.log('Error con status: ' + status);
      });
    };
  }]);
