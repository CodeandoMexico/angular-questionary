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
    $scope.$watch('sections', function(newValue, oldValue){
      if (newValue === oldValue) { return ; }
      // answer array containers for one question
      var necessityAnswerContainer = [
        newValue['2.C.1'].questions[0].body.options[0].priority,
        newValue['2.C.2'].questions[0].body.options[0].priority
      ];
      var professionalAnswerContainer = [
        newValue['2.C.1'].questions[0].body.options[0].priority,
        newValue['2.C.1'].questions[0].body.options[1].priority,
        newValue['2.C.2'].questions[0].body.options[0].priority,
        newValue['2.C.2'].questions[0].body.options[1].priority
      ];

      // check if there is a necessity profile
      var hasNecessityProfile = FondesoProfile.checkForNecessityProfile(
        newValue['1.B'].questions[2].body.selected_value.value,
        necessityAnswerContainer,
        newValue['2.C.3'].questions[0].body.selected_value,
        newValue['2.C.4'].questions[0].body.selected_value
      );

      // check if there is a professional profile
      var hasProfessionalProfile = FondesoProfile.checkForProfessionalProfile(
        newValue['1.B'].questions[2].body.selected_value.value,
        professionalAnswerContainer,
        newValue['2.C.3'].questions[0].body.selected_value,
        newValue['2.C.4'].questions[0].body.selected_value
      );

      // is it a necessity profile and is on the correct section?
      if( hasNecessityProfile && Questionary.walkedPathHasSection('2.C.4', $scope.walkedPath) ){
        alert('Se detectó un perfil de necesidad');
      }

      // is it a professional profile and is on the correct section?
      if( hasProfessionalProfile && Questionary.walkedPathHasSection('2.C.4', $scope.walkedPath) ){
        alert('Se detectó un perfil de profesionista');
      }
    }, true);
  }]);
