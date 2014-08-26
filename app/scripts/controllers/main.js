'use strict';

angular.module('questionaryApp')
  .controller('MainCtrl', ['$scope', '$location', '$anchorScroll', 'Questionary', 'FondesoSpecialCase', 'FondesoFilter', 'FondesoProfile', function ($scope, $location, $anchorScroll, Questionary, FondesoSpecialCase, FondesoFilter, FondesoProfile) {
    // types of questions are: text, number, radio, checkbox
    $scope.sections = Questionary.sections;
    $scope.walkedPath = null;
    $scope.currentSection = null;

    $scope.showResults = function(){
      // submit the data to the service and see if it was successful
      Questionary.submit($scope.walkedPath).then(function(res){
        console.log(res);
        var profile = res.data;
        // var redirectTo = '/profile' + profile.uri;
        // redirect to the results when they come, it should return the category name
        $location.url( redirectTo(profile.uri) );
      }, function (err) {
        // there was an error so let's do something about it
        console.log('There was an error' + err);
      });
    };

    $scope.onSectionChange = function(){
      $location.hash('top');
      $anchorScroll();
    };

    // watcher for special cases
    $scope.$watch('walkedPath', function(newValue, oldValue){
      if (newValue === oldValue) { return ; }

      // is it a necessity profile and is on the correct section?
      if( FondesoSpecialCase.checkForNecessityProfile($scope.sections, newValue) ){
        // we've got to redirect this to the necessity funds
        $location.url( redirectTo('necesidad-startup') );
      }

      // is it a professional profile and is on the correct section?
      if( FondesoSpecialCase.checkForProfessionalProfile($scope.sections, newValue) ){
        alert('Se detectó un perfil de profesionista');
      }

      // check all filters
      checkAllFilters($scope.sections, newValue);

    }, true);

    // private

    function redirectTo(uri) {
      console.log('/profile/' + uri);
      return '/profile/' + uri;
    }

    function checkAllFilters(sections, walkedPath){
      $scope.filters = {
        MUJ: false,
        RUR: false,
        JOV: false,
        TER: false,
        ART: false,
        TAB: false,
        BAC: false,
        EXP: false,
        MAN: false,
        PIN: false,
        CON: false,
        TUR: false,
        ATI: false,
        IND: false,
        TIC: false
      };
      // is the requesting person a women
      $scope.filters.MUJ = FondesoFilter.checkForWomenFilter(sections, walkedPath);
      $scope.filters.RUR = FondesoFilter.checkForRuralFilter(sections, walkedPath);
      $scope.filters.JOV = FondesoFilter.checkForYoungFilter(sections, walkedPath);
      $scope.filters.TER = FondesoFilter.checkForElderlyFilter(sections, walkedPath);
      $scope.filters.ART = FondesoFilter.checkForArtisanFilter(sections, walkedPath);
      $scope.filters.TAB = FondesoFilter.checkForConvenienceStoreFilter(sections, walkedPath);
      $scope.filters.BAC = FondesoFilter.checkForCollegeFilter(sections, walkedPath);
      $scope.filters.EXP = FondesoFilter.checkForExportFilter(sections, walkedPath);
      $scope.filters.MAN = FondesoFilter.checkForManufactureFilter(sections, walkedPath);
      $scope.filters.PIN = FondesoFilter.checkForIntellectualPropertyFilter(sections, walkedPath);
      $scope.filters.CON = FondesoFilter.checkForConstructionFilter(sections, walkedPath);
      $scope.filters.TUR = FondesoFilter.checkForTourismFilter(sections, walkedPath);
      // $scope.filters.ATI = FondesoFilter.checkForAccessToITFilter(sections, walkedPath);

      console.log($scope.filters);

    }

  }]);
