'use strict';

/**
 * @ngdoc service
 * @name questionaryApp.fondesoProfile
 * @description
 * # fondesoProfile
 * Service in the questionaryApp.
 */
angular.module('questionaryApp')
  .service('FondesoProfile', function fondesoProfile() {
    // AngularJS will instantiate a singleton by calling "new" on this function
    return {
      forQuestionAnswerShouldBe: function (question, givenAnswer){
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
      },

      // helpers for the controller
      checkForNecessityProfile: function (givenAnswerA, givenAnswerB, givenAnswerC, givenAnswerD){
        // console.log(givenAnswerA + ' ' + givenAnswerB + ' ' + givenAnswerC + ' ' + givenAnswerD);
        // console.log(this.forQuestionAnswerShouldBe('education', givenAnswerA));
        // console.log(this.forQuestionAnswerShouldBe('reason_to_build_this_project_and_principal_business_objective', givenAnswerB));
        // console.log(this.forQuestionAnswerShouldBe('current_laboral_situation', givenAnswerC));
        // console.log(this.forQuestionAnswerShouldBe('if_someone_offered_me_a_job', givenAnswerD));

        return this.forQuestionAnswerShouldBe('education', givenAnswerA) &&
               this.forQuestionAnswerShouldBe('reason_to_build_this_project_and_principal_business_objective', givenAnswerB) &&
               this.forQuestionAnswerShouldBe('current_laboral_situation', givenAnswerC) &&
               this.forQuestionAnswerShouldBe('if_someone_offered_me_a_job', givenAnswerD);
      }
    };
  });
