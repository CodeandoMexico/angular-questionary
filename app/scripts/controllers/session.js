'use strict';

/**
 * @ngdoc function
 * @name questionaryApp.controller:SessionCtrl
 * @description
 * # SessionCtrl
 * Controller of the questionaryApp
 */
angular.module('questionaryApp')
  .controller('SessionCtrl', ['$location', 'FondesoUser', function ($location, FondesoUser) {
    this.user = {
      email: null,
      password: null
    };

    this.logIn = function( resource, valid ){
        if ( valid ) return logUserIn( resource, this.error );
        // this.submitted = true;
    };

    // private methods
    var logUserIn = function( resource, err ){
      FondesoUser.logIn( resource ).
      success(function(data, status, headers, config){
        FondesoUser.userIsLoggedIn().
        success(function(data, status, headers, config){
          FondesoUser.current = data;
          if( FondesoUser.validateLogin( data ) ){
            console.log('logging in..');
            $location.url('/intro/');
          }
        });
      }).
      error(function(data, status, headers, config){
        console.log('Error con status: ' + status);
      });
    };
  }]);
