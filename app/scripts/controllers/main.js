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
      // is the requesting person a women
      if( FondesoFilter.checkForWomenFilter(sections, walkedPath) ){
        alert('Se activó el filtro de mujer');
      }

      if( FondesoFilter.checkForRuralFilter(sections, walkedPath) ){
        alert('Se activó el filtro de un negocio rural');
      }

      if( FondesoFilter.checkForYoungFilter(sections, walkedPath) ){
        alert('Se activó el filtro de una persona menor a 30 años');
      }

      if( FondesoFilter.checkForElderlyFilter(sections, walkedPath) ){
        alert('Se activó el filtro de una persona mayor o igual a 60 años');
      }

      if( FondesoFilter.checkForArtisanFilter(sections, walkedPath) ){
        alert('Se activó el filtro de artesano');
      }

      if( FondesoFilter.checkForConvenienceStoreFilter(sections, walkedPath) ){
        alert('Se activó el filtro de tienda de abarrotes');
      }

      if( FondesoFilter.checkForCollegeFilter(sections, walkedPath) ){
        alert('Se activó el filtro de colegio');
      }

      if( FondesoFilter.checkForExportFilter(sections, walkedPath) ){
        alert('Se activó el filtro de exportación');
      }
    }

  }]);
