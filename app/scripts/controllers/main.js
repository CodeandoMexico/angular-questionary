'use strict';

angular.module('questionaryApp')
  .controller('MainCtrl', ['$scope', '$location', 'Questionary', 'Fund', function ($scope, $location, Questionary, Fund) {
    // types of questions are: text, number, radio, checkbox
    $scope.sections = Questionary.sections;
    $scope.walkedPath = null;
    $scope.currentSection = null;

    $scope.showResults = function(){
      // submit the data to the service and see if it was successful
      Questionary.submit($scope.walkedPath).then(function(res){
        console.log(res);
        var profile = res.data;
        var redirect_to = '/fondos' + profile.uri;
        // redirect to the results when they come, it should return the category name
        $location.url(redirect_to);
      }, function (err) {
        // there was an error so let's do something about it
      });
    }
  }]);
