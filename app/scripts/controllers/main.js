'use strict';

angular.module('questionaryApp')
  .controller('MainCtrl', ['$scope', '$location', '$anchorScroll', '$timeout', 'Questionary', 'Fund', function ($scope, $location, $anchorScroll, $timeout, Questionary, Fund) {
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

    $scope.$watch('sections', function(newValue, oldValue){
      if (newValue === oldValue) { return ; }
      var answerContainer = [newValue['2.C.1'].questions[0].body.options[0].priority, newValue['2.C.2'].questions[0].body.options[0].priority];
      var hasNecessityProfile = checkForNecessityProfile(
        newValue['1.B'].questions[2].body.selected_value.value,
        answerContainer,
        newValue['2.C.3'].questions[0].body.selected_value,
        newValue['2.C.4'].questions[0].body.selected_value
      );
      console.log('Does it fulfill the case?');
      console.log(hasNecessityProfile);
    }, true);


    function forQuestionAnswerShouldBe(question, givenAnswer, expectedAnswer){
      // let's see if the question is equal to this.
      switch (question) {
      case 'education':
        return angular.equals(givenAnswer, 'a') ||
               angular.equals(givenAnswer, 'b') ||
               angular.equals(givenAnswer, 'c') ||
               angular.equals(givenAnswer, 'd');
      case 'reason_to_build_this_project_and_principal_business_objective':
        return angular.equals(givenAnswer, [1,2]) || angular.equals(givenAnswer, [2,1]) || angular.equals(givenAnswer, [1,1]);
      case 'current_laboral_situation':
        return angular.equals(givenAnswer, 'a');
      case 'if_someone_offered_me_a_job':
        return angular.equals(givenAnswer, 'a');
      default:
        return false;
      }
    }

    // helpers for the controller
    function checkForNecessityProfile(givenAnswerA, givenAnswerB, givenAnswerC, givenAnswerD){
      console.log(givenAnswerA + " " + givenAnswerB + " " + givenAnswerC + " " + givenAnswerD);
      console.log(forQuestionAnswerShouldBe('education', givenAnswerA));
      console.log(forQuestionAnswerShouldBe('reason_to_build_this_project_and_principal_business_objective', givenAnswerB));
      console.log(forQuestionAnswerShouldBe('current_laboral_situation', givenAnswerC));
      console.log(forQuestionAnswerShouldBe('if_someone_offered_me_a_job', givenAnswerD));

      return forQuestionAnswerShouldBe('education', givenAnswerA) &&
             forQuestionAnswerShouldBe('reason_to_build_this_project_and_principal_business_objective', givenAnswerB) &&
             forQuestionAnswerShouldBe('current_laboral_situation', givenAnswerC) &&
             forQuestionAnswerShouldBe('if_someone_offered_me_a_job', givenAnswerD);
    }
  }]);
