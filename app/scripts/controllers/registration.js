'use strict';

/**
 * @ngdoc function
 * @name questionaryApp.controller:RegistrationCtrl
 * @description
 * # RegistrationCtrl
 * Controller of the questionaryApp
 */
angular.module('questionaryApp')
  .controller('RegistrationCtrl', ['$scope', '$location', 'FondesoUser', function ($scope, $location, FondesoUser) {
    var self = this;
    // there is already a logged in user
    if( angular.isObject(FondesoUser.current) ) $location.url('/intro');

    this.newUser = {
      name: null,
      email: null,
      password: null,
      passwordConfirmation: null
    };

    this.createAccount = function( resource, valid ){
        if ( valid ) return createUser( resource );
        $scope.submitted = true;
    };

    // private methods
    var createUser = function( resource ){
      FondesoUser.create( resource ).
      success(function(data, status, headers, config){
        console.log('Success!');
        console.log(status);
        console.log(data);
        $location.url('/intro/')
      }).
      error(function(data, status, headers, config){
        console.log('Error con status: ' + status);
        console.log('error');
        console.log(self);
        $scope.submitted = true;
      });
    };
  }]);
