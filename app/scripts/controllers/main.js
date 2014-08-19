'use strict';

angular.module('questionaryApp')
  .controller('MainCtrl', ['$scope', '$location', '$anchorScroll', '$timeout', 'Questionary', 'Fund', 'FondesoProfile', function ($scope, $location, $anchorScroll, $timeout, Questionary, Fund, FondesoProfile) {
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
    };

    $scope.onSectionChange = function(){
      $location.hash('top');
      $anchorScroll();
    };

    // watcher for special cases
    $scope.$watch('sections', function(newValue, oldValue){
      if (newValue === oldValue) { return ; }
      var answerContainer = [newValue['2.C.1'].questions[0].body.options[0].priority, newValue['2.C.2'].questions[0].body.options[0].priority];
      var hasNecessityProfile = FondesoProfile.checkForNecessityProfile(
        newValue['1.B'].questions[2].body.selected_value.value,
        answerContainer,
        newValue['2.C.3'].questions[0].body.selected_value,
        newValue['2.C.4'].questions[0].body.selected_value
      );
      console.log('Does it fulfill the case?: ' + hasNecessityProfile);
    }, true);
  }]);
