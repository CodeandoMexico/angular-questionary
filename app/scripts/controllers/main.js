'use strict';

angular.module('questionaryApp')
  .controller('MainCtrl', function ($scope) {
    $scope.questionary = [
      {
        identifier : '1.B.1',
        grouped    : true,
        questions : [
          {
            title  : 'Pregunta del tipo texto',
            help   : 'Escribe el valor de la respuesta',
            type   : 'text',
            body   : {
              value  : null,
            }
          },

          {
            title  : 'Pregunta del tipo numérico',
            help   : 'Escribe el valor de la respuesta numérico',
            type   : 'number',
            body   : {
              value  : 0,
            }
          },

          {
            title    : 'Pregunta del tipo radio',
            help     : 'Selecciona uno de los valores',
            type     : 'radio',
            body     : {
              value    : 'Femenino',
              options  : ['Masculino', 'Femenino']
            }
          },

          {
            title    : 'Pregunta del tipo checkbox',
            help     : 'Selecciona múltiples valores',
            type     : 'checkbox',
            body     : {
              value    : null,
              options  : [
                {label: 'Carro',     checked: false},
                {label: 'Bicicleta', checked: true},
                {label: 'Patineta',  checked: false},
                {label: 'Avión',     checked: true},
              ]
            }
          }
        ]
      }
    ];
  });
