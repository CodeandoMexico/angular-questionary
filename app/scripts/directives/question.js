'use strict';

// angular.module('questionaryApp')
angular.module('questionModule', [])
  .directive('question', function ($compile) {

    var getTemplate = function(fieldType){
      console.log('fieldType');
      console.log(fieldType);
      var template = '';
      template += '<pre ng-if="code">{{code | json}}</pre>';
      template += '<h3>{{title}}</h3>';
      template += '<h4>{{help}}</h4>';


      switch(fieldType){
      case 'text':
        template += '<input class="form-control" type="text" ng-model="body.value">';
        break;
      case 'number':
        template += '<input class="form-control" type="number" ng-model="body.value">';
        break;
      case 'radio':
        template += '<div ng-repeat="opt in body.options" class="row-fluid"><label><input type="radio" name="radio{{outerIndex}}" ng-value="opt" ng-model="body.value" />&nbsp;<span ng-bind="opt"></span></label></div>';
        break;
      case 'checkbox':
        template += '<div ng-repeat="opt in body.options" class="row-fluid"><label><input type="checkbox" name="checkbox{{outerIndex}}" ng-value="opt" ng-model="opt.checked" />&nbsp;<span ng-bind="opt.label"></span></label></div>';
        break;

      }
      return template;
    };

    var linker = function(scope, element, attrs){
      element.html(getTemplate(scope.type));
      $compile(element.contents())(scope);
    };

    return {
      // template: '<div></div>',
      restrict: 'E',
      transclude: true,
      scope : {
        title     : '=',
        help      : '=',
        type      : '=',
        body      : '=',
        code      : '=',
      },
      link: linker
    };
  });
