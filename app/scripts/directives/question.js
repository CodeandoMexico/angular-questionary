'use strict';

// angular.module('questionaryApp')
var app = angular.module('questionModule', []);
app.run(['$templateCache', function($templateCache){
  $templateCache.put('section.html','<div class="section-container"><h2 ng-if="title">{{title}}</h2><h3 ng-if="description">{{description}}</h3><div class="questions-container" ng-transclude></div></div>');
  $templateCache.put('text-input.html','<input class="form-control" type="text" ng-model="body.value">');
  $templateCache.put('number-input.html','<input class="form-control" type="number" ng-model="body.value">');
  $templateCache.put('radio-input.html','<div ng-repeat="opt in body.options" class="row-fluid"><label><input type="radio" name="radio{{idx}}" ng-value="opt" ng-model="body.value" />&nbsp;<span ng-bind="opt"></span></label></div>');
  $templateCache.put('checkbox-input.html','<div ng-repeat="opt in body.options" class="row-fluid"><label><input type="checkbox" name="checkbox{{idx}}" ng-model="opt.checked" />&nbsp;<span ng-bind="opt.label"></span></label></div>');
}]);

app.directive('section', function(){
  var linker = function(scope, element){

  };

  return {
    restrict: 'EA',
    templateUrl: 'section.html',
    scope: {
      title : '@',
      description: '@'
    },
    link: linker,
    transclude: true
  }
})

app.directive('question', ['$compile', function ($compile) {
  return {
    template: '<div class="question-container"><div class="question-header" ng-transclude></div><div class="question-body" ng-include="template[type]"></div></div>',
    restrict: 'EA',
    controller: ['$scope', function($scope){
        $scope.template = {
          text: 'text-input.html',
          number: 'number-input.html',
          radio: 'radio-input.html',
          checkbox: 'checkbox-input.html',
        }
    }],
    transclude: true,
    scope : {
      title     : '=',
      help      : '=',
      type      : '=',
      body      : '=',
      code      : '=',
      idx       : '='
    },
  };
}]);
