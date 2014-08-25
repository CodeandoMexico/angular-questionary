'use strict';

/**
 * @ngdoc service
 * @name questionaryApp.fondesoFilter
 * @description
 * # fondesoFilter
 * Service in the questionaryApp.
 */
angular.module('questionaryApp')
  .service('FondesoFilter', ['Questionary', function fondesoFilter(Questionary) {
    var forFilterAnswerShouldBe =  function (filter, givenAnswer){
      /**
        For the given answers this methods checks if a filter should be
        activated(true) or not(false).
       */

       if ( angular.isUndefined(givenAnswer) ) {
         filter = 'answer_is_undefined';
       }

      switch (filter) {
        // list of filters
        case 'sex_is_women':
          return angular.equals(givenAnswer, 'b');
        case 'business_is_rural_sector':
          return angular.equals(givenAnswer[0], 'g') ||
                 angular.equals(givenAnswer[1], 'g');
         case 'younger_than_30':
           return givenAnswer < 30;

        default:
          return false;
      }
    };

    var extractAnswerFromQuestion = function (question){
      /**
        There are various type of questions: ordinal, select, radio, checkbox, numeric, etc.
        Each of this questions has a different way to access the answers so..

        This method depending on the question type will return the given answer.
       */
      switch (question.type) {
        case 'select':
          if ( angular.isUndefined(question.body.selected_value) ) return undefined;
          return question.body.selected_value.value;
        case 'number':
          return question.body.value;

        default:
          return undefined;
      }
    };

    /**
      -- Fetch Methods --

      This methods wraps the answers corresponding to a filter for later
      check it's values in an array.
     */

    var fetchSexAnswer = function(sections) {
      return sections['1.B'].questions[1].body.selected_value;
    };

    var fetchRuralAnswers = function(sections) {
      return [
        extractAnswerFromQuestion(sections['2.A.3'].questions[0]),
        extractAnswerFromQuestion(sections['2.C.5'].questions[0])
      ];
    };

    var fetchAgeAnswer = function(sections){
      return extractAnswerFromQuestion(sections['1.B'].questions[0]);
    };

    return {
      // helpers
      checkForWomenFilter: function (sections, walkedPath) {
        var givenAnswer = fetchSexAnswer(sections);
        return forFilterAnswerShouldBe('sex_is_women', givenAnswer) &&
               Questionary.walkedPathHasSection('1.B', walkedPath);
      },

      checkForRuralFilter: function (sections, walkedPath) {
        var givenAnswers = fetchRuralAnswers(sections);
        return forFilterAnswerShouldBe('business_is_rural_sector', givenAnswers) &&
               (
                 Questionary.walkedPathHasSection('2.A.3', walkedPath) ||
                 Questionary.walkedPathHasSection('2.C.5', walkedPath)
               );
      },

      checkForYoungFilter: function (sections, walkedPath) {
        var givenAnswer = fetchAgeAnswer(sections);
        return forFilterAnswerShouldBe('younger_than_30', givenAnswer) &&
               Questionary.walkedPathHasSection('1.B', walkedPath);
      },



    };
  }]);
