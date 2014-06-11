'use strict';

angular.module('questionaryApp')
  .service('Fund', ['$http', function($http){
    var baseUrl = 'http://localhost:3000/fondos';
    var api = {
      all: function(){
        var url = baseUrl + '/';
        // var url = "http://ip.jsontest.com/"
        return $http.get(url);
      },
      category: function(category){
        var url = baseUrl + '/categoria/' + category;
        console.log(url);
        return $http.get(url);
      }
    }

    return api;
  }]);
