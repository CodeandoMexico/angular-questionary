'use strict';

angular.module('questionaryApp')
  .service('FondesoProfile', ['$http', function($http){
    var baseUrl = 'http://fondeso.herokuapp.com/profile';
    var api = {
      all: function(){
        var url = baseUrl + '/';
        // var url = "http://ip.jsontest.com/";
        return $http.get(url);
      },
      category: function(category){
        var url = baseUrl + '/' + category + '/';
        console.log(url);
        return $http.get(url);
      }
    }
    return api;
  }]);
