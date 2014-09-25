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
  .run(['$rootScope', '$http', '$cookies', '$location', 'FondesoUser',  function($rootScope, $http, $cookies, $location, FondesoUser){
    // $http.defaults.headers.post['X-CSRFToken'] = $cookies.csrftoken;
    $http.defaults.headers.post['XSRF-TOKEN'] = $cookies.csrftoken;

    var noAuthRoutes = ['', '/', '/usuario/crear', '/usuario/crear/'];
    var routeRequiresAuth = function(currentRoute) {
      // route requires auth if it's not in the whitelist
      return noAuthRoutes.indexOf( currentRoute ) === -1;
    };

    $rootScope.$on('$routeChangeStart', function (event, next, current) {
      var currentPath = $location.url();
      FondesoUser.userIsLoggedIn().
      success(function(data, status, headers, config){
        FondesoUser.current = data;
        if( !routeRequiresAuth( currentPath ) || FondesoUser.validateLogin( data ) ){
          // do some stuff before logging in
          console.log('A user is already logged in');
        }
        else{
          console.log('this site require auth');
          // redirect back to the login page
          $location.url('/');
        }
      }).
      error(function(data, status, headers, config){
        // something bad happened
        $location.url('/');
      });
    });

  }])
  .config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider) {
    //Enable cross domain calls
    // $httpProvider.defaults.useXDomain = true;
    $httpProvider.defaults.withCredentials = true;
    // $httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');
    // delete $httpProvider.defaults.headers.common["X-Requested-With"];

    $routeProvider
      // .when('/usuario/login/', {
      .when('/', {
        templateUrl: 'views/login.html',
        controller: 'SessionCtrl',
        controllerAs: 'session'
      })
      .when('/intro/', {
        templateUrl: 'views/intro.html',
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
