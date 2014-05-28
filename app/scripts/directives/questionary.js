'use strict';

// angular.module('questionaryApp')
var app = angular.module('questionModule', ['ui.sortable']);
app.run(['$templateCache', function($templateCache){

  // directive's skeleton templates
  $templateCache.put('questionary.html', '<div><div ng-transclude></div><button class="btn btn-primary" ng-click="moveToPreviousSection()">Regresar</button><button class="btn btn-primary" ng-click="moveToNextSection()">Continuar</button></div>')
  $templateCache.put('section.html','<div class="section-container"><h2 ng-if="title">{{title}}</h2><h3 ng-if="description">{{description}}</h3><div class="questions-container" ng-transclude></div></div>');
  $templateCache.put('question.html', '<div class="question-container"><div class="question-header"><h4 class="question-title">{{ title }}</h4><h5 class="question-description">{{ description }}</h5></div><div class="question-body" ng-include="template[type]"></div><div ng-transclude></div><pre ng-if="debug">{{ codeData | json}}</pre></div>');

  // answer templates
  $templateCache.put('text-input.html','<input class="form-control" type="text" ng-model="body.value">');
  $templateCache.put('number-input.html','<input class="form-control" type="number" min="0" ng-model="body.value">');
  $templateCache.put('radio-input.html','<div class="radio" ng-repeat="opt in body.options"><label><input type="radio" name="radio{{idx}}" value="{{opt}}" ng-model="body.selected_value">{{opt}}</label></div>');
  $templateCache.put('checkbox-input.html','<div class="checkbox" ng-repeat="opt in body.options"><label><input type="checkbox" name="checkbox{{idx}}" ng-model="opt.checked">{{opt.label}}</label></div>');
  $templateCache.put('select-input.html','<select class="form-control" ng-model="body.selected_value" ng-options="option.label for option in body.options"></select>');
  $templateCache.put('order-input.html','<ol ui-sortable ng-model="body.options" class="order-question"><li ng-repeat="opt in body.options">{{opt.label}}</li></ol>');
}]);

app.directive('questionary', function(){
  return {
    templateUrl: 'questionary.html',
    restrict: 'EA',
    transclude: true,
    scope: {
      firstSection: '@',
      lastSection: '@',
      sections: '=',
      currentSection: '=',
    },
    controller: ['$scope', function($scope){
      // initialize variables
      $scope.currentSection = $scope.sections[$scope.firstSection];
      $scope.nextSection = $scope.sections[$scope.currentSection.next];
      // $scope.previousSection = null;
      $scope.walkedPath = [];

      // create helpers
      function oneStepForward(){
        $scope.walkedPath.push($scope.currentSection); // let's save where we've been through
        $scope.currentSection = $scope.nextSection; // go to the next section
        $scope.nextSection = $scope.sections[$scope.currentSection.next]; // get the next section
      }

      function oneStepBackward(){
        $scope.nextSection = $scope.curentSection;
        $scope.currentSection = $scope.walkedPath.pop();
      }

      // console.log('current section');
      // console.log($scope.sections);
      // console.log($scope.currentSection);
      // console.log($scope.nextSection);
      $scope.moveToNextSection = function(){
        // if there's a next section we should go there
        if(angular.isObject($scope.nextSection)){
          console.log('moving one section ahead');
          oneStepForward();
        }
        else{
          console.log('disappear next button');
        }
      };
      $scope.moveToPreviousSection = function(){
        // if there's a next section we should go there
        $scope.numberOfWalkedSections = $scope.walkedPath.length;
        var previousSection = $scope.walkedPath[$scope.numberOfWalkedSections - 1];
        if(angular.isObject(previousSection)){
          console.log('moving one section backward');
          oneStepBackward();
        }
        else{
          console.log('disappear previous button')
        }
      };
    }],
    link: function(scope){
      scope.$on('PATH_CHANGE', function(event, args){
        console.log('PATH_CHANGE DETECTED');
        // we need to change the next section
        scope.nextSection = scope.sections[args.new_path];
      });
    }
  }
})

app.directive('section', function(){
  return {
    templateUrl: 'section.html',
    restrict: 'EA',
    transclude: true,
    scope: {
      title : '@',
      description: '@',
    }
  }
})

app.directive('question', ['$rootScope','$compile', function ($rootScope, $compile) {
  return {
    templateUrl: 'question.html',
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
      var answerWatcher = scope.$watch('body.selected_value', function(newValue, oldValue){
        var type = scope.type;
        if((type === 'select' || type === 'radio')){
          if(angular.isDefined(newValue.change_path)){
            // console.log('new path' + newValue.change_path);
            $rootScope.$broadcast('PATH_CHANGE', {new_path: newValue.change_path});
          }
          return;
        }
        else{
          console.log('it doesn\'t apply');
          return;
        }
      }, true);
    }
  };
}]);
