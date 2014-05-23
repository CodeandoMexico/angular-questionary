'use strict';

// angular.module('questionaryApp')
angular.module('questionModule', [])
  .directive('question', function ($compile) {

    var getTemplate = function(fieldType){
      console.log('fieldType');
      console.log(fieldType);
      var template = '';
      template += '<pre ng-if="code">{{code | json}}</pre>';
      template += '<div class="form-group"><label for="{{title}}" class="col-sm-3 control-label">{{title}}</label>';

      switch(fieldType){
      case 'text':
        template += '<div class="col-sm-9"><input class="form-control" type="text" ng-model="body.value"></div>';
        break;
      case 'number':
        template += '<div class="col-sm-9"><input class="form-control" type="number" ng-model="body.value"></div>';
        break;
      case 'radio':
        template += '<div class="col-sm-9"><div ng-repeat="opt in body.options" class="row-fluid"><label><input type="radio" name="radio{{outerIndex}}" ng-value="opt" ng-model="body.value" />&nbsp;<span ng-bind="opt"></span></label></div></div>';
        break;
      case 'checkbox':
        template += '<div class="col-sm-9"><div ng-repeat="opt in body.options" class="row-fluid"><label><input type="checkbox" name="checkbox{{outerIndex}}" ng-value="opt" ng-model="opt.checked" />&nbsp;<span ng-bind="opt.label"></span></label></div></div>';
        break;

      }
      template += '</div>';

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
