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
    this.newUser = {
      name: null,
      email: null,
      password: null,
      passwordConfirmation: null
    };

    this.createAccount = function( resource ){
      FondesoUser.userIsLoggedIn().
      success(function(data, status, headers, config){
        if( userIsLoggedIn(data) ){
          // redirect to other place
          alert('A user is already logged in');
        }
        else{
          createUser( resource );
        }
      }).
      error(function(data, status, headers, config){
        // something bad happened
      });
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

    var userIsLoggedIn = function(args) {
      return angular.isObject( args );
    };

  }]);
