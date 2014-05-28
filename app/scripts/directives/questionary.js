'use strict';

// angular.module('questionaryApp')
var app = angular.module('questionModule', ['ui.sortable']);
app.run(['$templateCache', function($templateCache){

  // directive's skeleton templates
  $templateCache.put('questionary.html', '<div class="questionary-container"><div ng-transclude></div><div class="navigation-container"><a class="navigation-control previous pull-left" ng-if="navigation.hasPrevious" ng-click="moveToPreviousSection()"><span class="glyphicon glyphicon-arrow-left"></span></a><a class="navigation-control next pull-right" ng-if="navigation.hasNext" ng-click="moveToNextSection()">&nbsp;<span class="glyphicon glyphicon-arrow-right"></span></a></div></div>')
  $templateCache.put('section.html','<div class="section-container"><h2 ng-if="title">{{title}}</h2><p class="text-muted" ng-if="description">{{description}}</p><div class="questions-container" ng-transclude></div></div>');
  $templateCache.put('question.html', '<div class="question-container"><div class="question-header"><p class="question-title">{{ title }}</p><p class="question-description">{{ description }}</p></div><div class="question-body" ng-include="template[type]"></div><div ng-transclude></div><pre ng-if="debug">{{ codeData | json}}</pre></div>');

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
      $scope.walkedPath = [];
      $scope.navigation = {
        hasNext: false,
        hasPrevious: false
      };
      // $scope.previousSection = null;

      // create helpers
      function oneStepForward(){
        $scope.walkedPath.push($scope.currentSection); // let's save where we've been through
        $scope.currentSection = $scope.nextSection; // go to the next section
        $scope.nextSection = $scope.sections[$scope.currentSection.next]; // get the next section
      }

      function oneStepBackward(){
        $scope.nextSection = $scope.currentSection;
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
        var numberOfWalkedSections = $scope.walkedPath.length;
        if(numberOfWalkedSections - 1 >= 0){
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
        // console.log('PATH_CHANGE DETECTED');
        // we need to change the next section
        scope.nextSection = scope.sections[args.new_path];
      });
      scope.$watch('currentSection', function(newValue, oldValue){
        // console.log(scope.walkedPath.length);
        var numberOfWalkedSections = scope.walkedPath.length + 1;
        // console.log(numberOfWalkedSections);
        // console.log(scope.sections.length);
        // check if has a next and previous section
        scope.navigation.hasNext = angular.isObject(scope.nextSection)
        scope.navigation.hasPrevious = (numberOfWalkedSections - 1 > 0) ? true : false
        // console.log(scope.navigation.hasPrevious);
      }, true);
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
        if(newValue == 'select' && (scope.body.selected_value === 'null' || angular.isUndefined(scope.body.selected_value))){
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
          // console.log('it doesn\'t apply');
          return;
        }
      }, true);
    }
  };
}]);
