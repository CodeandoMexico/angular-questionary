'use strict';

angular.module('questionaryApp')
  .controller('MainCtrl', ['$scope', 'Questionary', function ($scope, Questionary) {
    // types of questions are: text, number, radio, checkbox
    // initialize values
    // var first_section = Questionary.start_at;
    $scope.sections = Questionary.sections;
    $scope.currentSection = null;
    // $scope.sectionIdx = 0;
    // $scope.currentSection = sections[first_section];

    // if the idx changes then also change the view
    // $scope.$watch('sectionIdx', function(newValue, oldValue){
    //   if(newValue === oldValue) return;
    //   // console.log(newValue, oldValue);
    //   // upper and lower limit restiction
    //   if(newValue < 0) {
    //     $scope.sectionIdx = oldValue;
    //     return;
    //   }
    //   else if(newValue >= questionary.length) {
    //     $scope.sectionIdx = oldValue;
    //     return;
    //   }
    //
    //   // assign the section
    //   $scope.currentSection = questionary[$scope.sectionIdx];
    // });

    // $scope.nextSection = function(){
    //   // console.log('nextSection');
    //   $scope.sectionIdx += 1;
    // };
    // $scope.previousSection = function(){
    //   $scope.sectionIdx -= 1;
    // };

    // console.log($scope.questionary);
  }]);
