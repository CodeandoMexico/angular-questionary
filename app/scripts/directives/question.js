'use strict';

// angular.module('questionaryApp')
var app = angular.module('questionModule', ['ui.sortable']);
app.run(['$templateCache', function($templateCache){
  $templateCache.put('section.html','<div class="section-container"><h2 ng-if="title">{{title}}</h2><h3 ng-if="description">{{description}}</h3><div class="questions-container" ng-transclude></div></div>');

  // answer templates
  $templateCache.put('text-input.html','<input class="form-control" type="text" ng-model="body.value">');
  $templateCache.put('number-input.html','<input class="form-control" type="number" ng-model="body.value">');
  $templateCache.put('radio-input.html','<div class="radio" ng-repeat="opt in body.options"><label><input type="radio" name="radio{{idx}}" value="{{opt}}" ng-model="body.selected_value">{{opt}}</label></div>');
  $templateCache.put('checkbox-input.html','<div class="checkbox" ng-repeat="opt in body.options"><label><input type="checkbox" name="checkbox{{idx}}" ng-model="opt.checked">{{opt.label}}</label></div>');
  $templateCache.put('select-input.html','<select class="form-control" ng-model="body.selected_value" ng-options="option for option in body.options"></select>');
  $templateCache.put('order-input.html','<ol ui-sortable ng-model="body.options" class="order-question"><li ng-repeat="opt in body.options">{{opt.label}}</li></ol>');
}]);

app.directive('section', function(){
  return {
    templateUrl: 'section.html',
    restrict: 'EA',
    transclude: true,
    scope: {
      title : '@',
      description: '@'
    }
  }
})

app.directive('question', ['$compile', function ($compile) {
  return {
    template: '<div class="question-container"><div class="question-header" ng-transclude></div><ng-form name="questionForm"><div class="question-body" ng-include="template[type]"></div></ng-form><pre ng-if="debug">{{ codeData | json}}</pre></div>',
    restrict: 'EA',
    controller: ['$scope', function($scope){
        $scope.codeData = {
          title: $scope.title,
          body: $scope.body
        }
        $scope.template = {
          text: 'text-input.html',
          number: 'number-input.html',
          radio: 'radio-input.html',
          checkbox: 'checkbox-input.html',
          select: 'select-input.html',
          order: 'order-input.html',
        }
    }],
    transclude: true,
    scope : {
      // title     : '=',
      // help      : '=',
      type      : '=',
      body      : '=',
      debug      : '=',
      idx       : '='
    },
  };
}]);
