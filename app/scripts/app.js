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
    var routeClean = function(currentRoute) {
      return noAuthRoutes.indexOf( currentRoute ) >= 0;
    };

    $rootScope.$on('$routeChangeStart', function (event, next, current) {
      // console.log('Changed route:' + $location.url());
      // if route requires auth and user is not logged in
      var currentPath = $location.url();
      if ( !routeClean( currentPath ) && FondesoUser.userIsLoggedIn() ) {
        // redirect to questionary intro
        $location.url('/intro/');
        console.log('current route is clean');
      } else {
        $location.url('/');
      }
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
        // controller: 'SessionCtrl',
        // controllerAs: 'session'
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
