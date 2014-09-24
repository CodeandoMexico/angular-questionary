'use strict';

angular
  .module('questionaryApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'ngGrid',
    'questionModule'
  ])
  .run(['$http', '$cookies', function($http, $cookies){
    // $http.defaults.headers.post['X-CSRFToken'] = $cookies.csrftoken;
    $http.defaults.headers.post['XSRF-TOKEN'] = $cookies.csrftoken;
  }])
  .config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider) {
    //Enable cross domain calls
    // $httpProvider.defaults.useXDomain = true;
    $httpProvider.defaults.withCredentials = true;
    // $httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');
    // delete $httpProvider.defaults.headers.common["X-Requested-With"];

    $routeProvider
      .when('/intro/', {
        templateUrl: 'views/intro.html',
      })
      .when('/usuario/login/', {
        templateUrl: 'views/login.html',
        controller: 'SessionCtrl',
        controllerAs: 'session'
      })
      .when('/usuario/crear/', {
        templateUrl: 'views/signup.html',
        controller: 'RegistrationCtrl',
        controllerAs: 'registration'
      })
      .when('/questionary/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/profile/', {
        templateUrl: 'views/fund.html',
        controller: 'FundCtrl'
      })
      .when('/profile/:category/', {
        templateUrl: 'views/fund.html',
        controller: 'FundCtrl'
      })
      .when('/tie/', {
        templateUrl: 'views/ties.html',
        controller: 'TieCtrl',
        controllerAs: 'tie'
      })
      .when('/404/', {
        templateUrl: '404.html'
      })
      .otherwise({
        redirectTo: '/404'
      });
  }]);
