'use strict';

angular.module('questionaryApp')
  .controller('MainCtrl', ['$scope', 'Questionary', function ($scope, Questionary) {
    // types of questions are: text, number, radio, checkbox
    $scope.sections = Questionary.sections;
    $scope.currentSection = null;
  }]);
