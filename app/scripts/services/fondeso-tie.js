'use strict';

/**
 * @ngdoc service
 * @name questionaryApp.fondesoTie
 * @description
 * # fondesoTie
 * Service in the questionaryApp.
 */
angular.module('questionaryApp')
  .service('FondesoTie', function fondesoTie() {
    var tieSections = {
      'business-category': {
        identifier : 'Desempate - Tipos de empresa',
        grouped    : false,
        questions : [
          {
            id     : '5.A.1',
            title  : 'Las siguientes frases describen diferentes tipos de empresas, elige la opción que más se identifique con tu empresa.',
            help   : 'Selecciona la respuesta con la que más te identificas.',
            type   : 'radio',
            body   : {
              selected_value    : 'a',
              options: []
            }
          },
        ],
      },
      'opposing-stages': {
        identifier : 'Desempate - Estado de desarrollo',
        grouped    : false,
        questions : [
          {
            id     : '5.A.2',
            title  : 'Las siguientes frases describen el estado de desarrollo de distintas empresas, elige la opción que más se identifique con tu proyecto.',
            help   : 'Selecciona la respuesta con la que más te identificas.',
            type   : 'radio',
            body   : {
              selected_value    : 'a',
              options: [
                { value: 'a', label: 'Mi proyecto se encuentra en una etapa inicial o de formación / tiene una estructura administrativa pequeña en donde yo tomo todas las decisiones del día a día.' },
                { value: 'b', label: 'Mi proyecto se ha consolidado en su mercado, competimos directamente con las empresas líderes de ese mercado / tiene una estructura administrativa y de decisión compleja y/o con procedimientos formalizados.' }
              ]
            }
          },
        ],
      }
    };

    var theyAreFromDifferentCategories = function (firstProfile, secondProfile) {
      return firstProfile[0] !== secondProfile[0];
    };

    var addOptionToQuestion = function (question, profile) {
      var option = null;
      var profileFirstLetter = profile[0];
      switch(profileFirstLetter){
        case 'n':
          option = { value: profileFirstLetter, label: 'El principal motivo para iniciar mi empresa es/será tener recursos para cubrir los gastos básicos. Si tuviera la oportunidad buscaría recursos de otra manera.' };
          break;
        case 't':
          option = { value: profileFirstLetter, label: 'Mi empresa es/será similar a muchas otras y mi producto ya se vende, pero aun así puedo obtener ganancias.' };
          break;
        case 'l':
          option = { value: profileFirstLetter, label: 'Mi negocio me permite/permitirá hacer lo que más me gusta y ser independiente.' };
          break;
        case 'c':
          option = { value: profileFirstLetter, label: 'Una parte central de mi empresa es desarrollar la creatividad y/o la expresión artística.' };
          break;
        case 's':
          option = { value: profileFirstLetter, label: 'El objetivo central de mi proyecto es contribuir para mejorar la situación de un grupo de la población y/o el medio ambiente.' };
          break;
        case 'h':
          option = { value: profileFirstLetter, label: 'Mi empresa tiene el potencial para crecer rápidamente porque es innovadora.' };
          break;
      }
      question.questions[0].body.options.push(option);
    };

    var chooseDefaultSelectedOption = function(section) {
      var questionBody = section.questions[0].body;
      questionBody.selected_value = questionBody.options[0].value;
    }

    var resolveQuestionToShow = function (profiles) {
      console.log('Perfiles');
      console.log(profiles);
      var firstProfile = profiles[0].profile_id;
      var secondProfile = profiles[1].profile_id;

      if ( theyAreFromDifferentCategories(firstProfile, secondProfile) ){
        var question = angular.copy(tieSections['business-category']);
        addOptionToQuestion(question, firstProfile);
        addOptionToQuestion(question, secondProfile);
        chooseDefaultSelectedOption(question);
        return question;
      }
      return angular.copy(tieSections['opposing-stages']);
    };

    return {
      profiles: [],
      walkedPath: [],
      tieSections: tieSections,
      getTieActiveSection: function(){
        return resolveQuestionToShow(this.profiles);
      },
      setProfiles: function(profiles){
        this.profiles = profiles;
      },
      getProfiles: function(){
        return this.profiles;
      },
      numberOfTiedProfiles: function(){
        return this.profiles.length;
      }
    };
  });
