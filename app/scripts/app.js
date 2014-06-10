'use strict';

angular
  .module('questionaryApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'questionModule'
  ])
  .run(['$http', function($http){
    var baseUrl = 'http://localhost:3000/';
    $http.get(baseUrl); // establish the first handshake
  }])
  .config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider) {
    //Enable cross domain calls
    // $httpProvider.defaults.useXDomain = true;
    $httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');
    // delete $httpProvider.defaults.headers.common["X-Requested-With"];

    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);
