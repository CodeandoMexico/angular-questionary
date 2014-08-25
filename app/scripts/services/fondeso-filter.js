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
      switch (filter) {
      // list of filters
      case 'sex_is_women':
        return angular.equals(givenAnswer, 'b');

      default:
        return false;
      }
    };

    var fetchSexAnswer = function(sections) {
      return sections['1.B'].questions[1].body.selected_value;
    };

    return {
      // helpers
      checkForWomenFilter: function (sections, walkedPath) {
        var givenAnswer = fetchSexAnswer(sections);
        return forFilterAnswerShouldBe('sex_is_women', givenAnswer) &&
               Questionary.walkedPathHasSection('1.B', walkedPath);
      },

      checkForRuralFilter: function (sections, walkedPath) {
        var givenAnswer = fetchSexAnswer(sections);
        return forFilterAnswerShouldBe('sex_is_women', givenAnswer) &&
               Questionary.walkedPathHasSection('1.B', walkedPath);
      },


    };
  }]);
