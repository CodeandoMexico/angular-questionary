'use strict';

angular.module('questionaryApp')
  .controller('MainCtrl', ['$scope', '$location', '$anchorScroll', '$timeout', 'Questionary', 'FondesoSpecialCase', function ($scope, $location, $anchorScroll, $timeout, Questionary, FondesoSpecialCase) {
    // types of questions are: text, number, radio, checkbox
    $scope.sections = Questionary.sections;
    $scope.walkedPath = null;
    $scope.currentSection = null;

    $scope.showResults = function(){
      // submit the data to the service and see if it was successful
      Questionary.submit($scope.walkedPath).then(function(res){
        console.log(res);
        var profile = res.data;
        var redirectTo = '/fondos' + profile.uri;
        // redirect to the results when they come, it should return the category name
        $location.url(redirectTo);
      }, function (err) {
        // there was an error so let's do something about it
      });
    };

    $scope.onSectionChange = function(){
      $location.hash('top');
      $anchorScroll();
    };

    // watcher for special cases
    $scope.$watch('walkedPath', function(newValue, oldValue){
      if (newValue === oldValue) { return ; }

      // is it a necessity profile and is on the correct section?
      if( FondesoSpecialCase.checkForNecessityProfile($scope.sections, newValue) ){
        alert('Se detectó un perfil de necesidad');
      }

      // is it a professional profile and is on the correct section?
      if( FondesoSpecialCase.checkForProfessionalProfile($scope.sections, newValue) ){
        alert('Se detectó un perfil de profesionista');
      }
    }, true);
  }]);
