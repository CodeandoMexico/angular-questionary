'use strict';

// angular.module('questionaryApp')
var app = angular.module('questionModule', ['ui.sortable']);
app.run(['$templateCache', function($templateCache){
  $templateCache.put('section.html','<div class="section-container"><h2 ng-if="title">{{title}}</h2><h3 ng-if="description">{{description}}</h3><div class="questions-container" ng-transclude></div></div>');

  // answer templates
  $templateCache.put('text-input.html','<input class="form-control" type="text" ng-model="body.value">');
  $templateCache.put('number-input.html','<input class="form-control" type="number" min="0" ng-model="body.value">');
  $templateCache.put('radio-input.html','<div class="radio" ng-repeat="opt in body.options"><label><input type="radio" name="radio{{idx}}" value="{{opt}}" ng-model="body.selected_value">{{opt}}</label></div>');
  $templateCache.put('checkbox-input.html','<div class="checkbox" ng-repeat="opt in body.options"><label><input type="checkbox" name="checkbox{{idx}}" ng-model="opt.checked">{{opt.label}}</label></div>');
  $templateCache.put('select-input.html','<select class="form-control" ng-model="body.selected_value" ng-options="option.label for option in body.options"></select>');
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
    template: '<div class="question-container"><div class="question-header"><h4 class="question-title">{{ title }}</h4><h5 class="question-description">{{ description }}</h5></div><div class="question-body" ng-include="template[type]"></div><div ng-transclude></div><pre ng-if="debug">{{ codeData | json}}</pre></div>',
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
      title : '=',
      description: '=',
      type      : '=',
      body      : '=',
      debug      : '=',
      idx       : '=',
      nested   : '='
    },
    link: function(scope, element){
      var selectWatcher = scope.$watch('type', function(newValue, oldValue){
        // console.log()
        // if(newValue === oldValue) return;
        // change the initial value to the object
        if(newValue == 'select'){
          scope.body.selected_value = scope.body.options[0];
          // console.log(scope.body.selected_value);
        }
      });
    }
  };
}]);
