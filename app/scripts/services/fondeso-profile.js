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

        // necessity profile questions
        case 'necessity_education':
          return angular.equals(givenAnswer, 'a') ||
                 angular.equals(givenAnswer, 'b') ||
                 angular.equals(givenAnswer, 'c') ||
                 angular.equals(givenAnswer, 'd');
        case 'necessity_reason_to_build_this_project_and_principal_business_objective':
          return angular.equals(givenAnswer, [1,2]) || angular.equals(givenAnswer, [2,1]) || angular.equals(givenAnswer, [1,1]);
        case 'necessity_current_laboral_situation':
          return angular.equals(givenAnswer, 'a');
        case 'necessity_if_someone_offered_me_a_job':
          return angular.equals(givenAnswer, 'a');

        // professional profile questions
        case 'professional_education':
          return angular.equals(givenAnswer, 'e') ||
                 angular.equals(givenAnswer, 'f');
        case 'professional_reason_to_build_this_project_and_principal_business_objective':
          return ( angular.equals(givenAnswer[0], 1) || angular.equals(givenAnswer[1], 1) ) && ( angular.equals(givenAnswer[2], 1) || angular.equals(givenAnswer[3], 1) );
        case 'professional_current_laboral_situation':
          return angular.equals(givenAnswer, 'a') || angular.equals(givenAnswer, 'b');
        case 'professional_if_someone_offered_me_a_job':
          return angular.equals(givenAnswer, 'a');

        default:
          return false;
        }
      },

      // helpers for the controller
      checkForNecessityProfile: function (givenAnswerA, givenAnswerB, givenAnswerC, givenAnswerD){
        // console.log(givenAnswerA + ' ' + givenAnswerB + ' ' + givenAnswerC + ' ' + givenAnswerD);
        // console.log(this.forQuestionAnswerShouldBe('necessity_education', givenAnswerA));
        // console.log(this.forQuestionAnswerShouldBe('necessity_reason_to_build_this_project_and_principal_business_objective', givenAnswerB));
        // console.log(this.forQuestionAnswerShouldBe('necessity_current_laboral_situation', givenAnswerC));
        // console.log(this.forQuestionAnswerShouldBe('necessity_if_someone_offered_me_a_job', givenAnswerD));

        return this.forQuestionAnswerShouldBe('necessity_education', givenAnswerA) &&
               this.forQuestionAnswerShouldBe('necessity_reason_to_build_this_project_and_principal_business_objective', givenAnswerB) &&
               this.forQuestionAnswerShouldBe('necessity_current_laboral_situation', givenAnswerC) &&
               this.forQuestionAnswerShouldBe('necessity_if_someone_offered_me_a_job', givenAnswerD);
      },

      checkForProfessionalProfile: function (givenAnswerA, givenAnswerB, givenAnswerC, givenAnswerD){
        // console.log(givenAnswerA + ' ' + givenAnswerB + ' ' + givenAnswerC + ' ' + givenAnswerD);
        // console.log(this.forQuestionAnswerShouldBe('necessity_education', givenAnswerA));
        // console.log(this.forQuestionAnswerShouldBe('necessity_reason_to_build_this_project_and_principal_business_objective', givenAnswerB));
        // console.log(this.forQuestionAnswerShouldBe('necessity_current_laboral_situation', givenAnswerC));
        // console.log(this.forQuestionAnswerShouldBe('necessity_if_someone_offered_me_a_job', givenAnswerD));

        return this.forQuestionAnswerShouldBe('professional_education', givenAnswerA) &&
               this.forQuestionAnswerShouldBe('professional_reason_to_build_this_project_and_principal_business_objective', givenAnswerB) &&
               this.forQuestionAnswerShouldBe('professional_current_laboral_situation', givenAnswerC) &&
               this.forQuestionAnswerShouldBe('professional_if_someone_offered_me_a_job', givenAnswerD);
      }
    };
  });
