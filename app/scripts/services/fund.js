'use strict';

angular.module('questionaryApp')
  .service('Fund', ['$http', function($http){
    var baseUrl = 'http://localhost:3000/';
    var api = {
      all: function(){
        var url = baseUrl + 'fondos/';
        // var url = "http://ip.jsontest.com/"
        return $http.get(url);
      },
    }

    return api;
  }]);
