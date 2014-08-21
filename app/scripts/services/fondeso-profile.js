'use strict';

angular.module('questionaryApp')
  .service('FondesoProfile', ['$http', function($http){
    var baseUrl = 'http://fondeso-staging.herokuapp.com';
    var api = {
      all: function(){
        var url = baseUrl + '/funds.json';
        return $http.get(url);
      },
      category: function(category){
        var url = baseUrl + '/profile/' + category + '/';
        return $http.get(url);
      }
    }
    return api;
  }]);
