'use strict';

angular.module('questionaryApp')
  .service('FondesoProfile', ['$http', function($http){
    var baseUrl = 'http://fondeso.herokuapp.com';
    var api = {
      all: function(){
        var url = baseUrl + '/funds.json';
        // var url = "http://ip.jsontest.com/";
        return $http.get(url);
      },
      category: function(category){
        var url = baseUrl + '/profile/' + category + '/';
        console.log(url);
        return $http.get(url);
      }
    }
    return api;
  }]);
