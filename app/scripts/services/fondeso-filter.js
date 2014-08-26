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
          return angular.equals(givenAnswer, 'g');
        case 'younger_than_30':
          return givenAnswer < 30;
        case 'older_or_equal_to_60':
          return givenAnswer >= 60;
        case 'artisans':
          return (
                    angular.equals(givenAnswer[0], 'a') ||
                    angular.equals(givenAnswer[0], 'b') ||
                    angular.equals(givenAnswer[0], 'c') ||
                    angular.equals(givenAnswer[0], 'd')
                 ) && (
                    angular.equals(givenAnswer[1], 'a') ||
                    angular.equals(givenAnswer[1], 'b') ||
                    angular.equals(givenAnswer[1], 'e') ||
                    angular.equals(givenAnswer[1], 'i') ||
                    angular.equals(givenAnswer[1], 'j')
                 );
        case 'convenience_store':
          return angular.equals(givenAnswer, 'b');
        case 'college':
          return givenAnswer[0] < 25 &&
                 (
                   angular.equals(givenAnswer[1], 'c') ||
                   angular.equals(givenAnswer[1], 'd')
                 );
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

    var fetchBusinessSectorAnswers = function(sector) {
      return extractAnswerFromQuestion(sector.questions[0]);
    };

    var fetchAgeAnswer = function(sections){
      return extractAnswerFromQuestion(sections['1.B'].questions[0]);
    };

    var fetchEducationAnswer = function(sections){
      return extractAnswerFromQuestion(sections['1.B'].questions[2]);
    };

    return {
      // helpers
      checkForWomenFilter: function (sections, walkedPath) {
        var givenAnswer = fetchSexAnswer(sections);
        return forFilterAnswerShouldBe('sex_is_women', givenAnswer) &&
               Questionary.walkedPathHasSection('1.B', walkedPath);
      },

      checkForRuralFilter: function (sections, walkedPath) {
        var firstPathAnswers = fetchBusinessSectorAnswers(sections['2.A.3']);
        var secondPathAnswers = fetchBusinessSectorAnswers(sections['2.C.5']);
        return (
                 Questionary.walkedPathHasSection('2.A.3', walkedPath) &&
                 forFilterAnswerShouldBe('business_is_rural_sector', firstPathAnswers)
               ) || (
                 Questionary.walkedPathHasSection('2.C.5', walkedPath) &&
                 forFilterAnswerShouldBe('business_is_rural_sector', secondPathAnswers)
               );
      },

      checkForYoungFilter: function (sections, walkedPath) {
        var givenAnswer = fetchAgeAnswer(sections);
        return forFilterAnswerShouldBe('younger_than_30', givenAnswer) &&
               Questionary.walkedPathHasSection('1.B', walkedPath);
      },

      checkForElderlyFilter: function (sections, walkedPath) {
        var givenAnswer = fetchAgeAnswer(sections);
        return forFilterAnswerShouldBe('older_or_equal_to_60', givenAnswer) &&
               Questionary.walkedPathHasSection('1.B', walkedPath);
      },

      checkForArtisanFilter: function (sections, walkedPath) {
        var education = fetchEducationAnswer(sections);
        var firstPathAnswers = fetchBusinessSectorAnswers(sections['2.A.3']);
        var secondPathAnswers = fetchBusinessSectorAnswers(sections['2.C.5']);
        return (
                 Questionary.walkedPathHasSection('2.A.3', walkedPath) &&
                 forFilterAnswerShouldBe('artisans', [education, firstPathAnswers])
               ) || (
                 Questionary.walkedPathHasSection('2.C.5', walkedPath) &&
                 forFilterAnswerShouldBe('artisans', [education, secondPathAnswers])
               );
      },

      checkForConvenienceStoreFilter: function (sections, walkedPath) {
        var firstPathAnswers = fetchBusinessSectorAnswers(sections['2.A.3']);
        var secondPathAnswers = fetchBusinessSectorAnswers(sections['2.C.5']);
        return (
                 Questionary.walkedPathHasSection('2.A.3', walkedPath) &&
                 forFilterAnswerShouldBe('convenience_store', firstPathAnswers)
               ) || (
                 Questionary.walkedPathHasSection('2.C.5', walkedPath) &&
                 forFilterAnswerShouldBe('convenience_store', secondPathAnswers)
               );
      },

      checkForCollegeFilter: function (sections, walkedPath) {
        var age = fetchAgeAnswer(sections);
        var education = fetchEducationAnswer(sections);
        return forFilterAnswerShouldBe('college', [age, education]) &&
               Questionary.walkedPathHasSection('1.B', walkedPath);
      },
    };
  }]);
