'use strict';

angular.module('questionaryApp')
  .controller('MainCtrl', ['$scope', 'Questionary', 'Fund', function ($scope, Questionary, Fund) {
    // types of questions are: text, number, radio, checkbox
    $scope.sections = Questionary.sections;
    $scope.currentSection = null;

    $scope.showResults = function(){
      // alert('I\'m done');
      // Fund.all().then(function(data){
      //   console.log(data);
      // });
      Questionary.submit().then(function(data){
        console.log(data);
      });
    }
  }]);
