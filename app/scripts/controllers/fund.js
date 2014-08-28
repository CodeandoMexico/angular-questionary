'use strict';

angular.module('questionaryApp')
  .controller('FundCtrl', ['$scope', '$routeParams', '$location', 'FondesoProfile', 'FondesoFilter', function ($scope, $routeParams, $location, FondesoProfile, FondesoFilter) {
    var category = $routeParams.category; // save value for later

    console.log($routeParams.category);
    $scope.fundSelected = [];
    $scope.funds = null;
    $scope.gridOptions = {
      data: 'funds',
      selectedItems: $scope.fundSelected,
      multiSelect: false,
      columnDefs: [
        { field: 'name', displayName: 'Nombre del Fondo', cellTemplate: '<div class="cell-background"><div class="ngCellText">{{row.getProperty(col.field)}}</div></div>' },
        // { field: 'institucion', displayName: 'Institución' },
        // { field: 'informes', displayName: 'Informes' }
      ]
    };

    // look if there is a category in the url, if not, return all the funds
    if(angular.isDefined(category)){
      FondesoProfile.category(category, FondesoFilter.filters).then(function(res){
        $scope.funds = res.data;
        // select the first item
        $scope.fundSelected[0] = $scope.funds[0];
      }, function(err){
        // there was an error we should redirect elsewhere
        $location.url('/404');
      });
    } else {
      FondesoProfile.all().then(function(res){
        $scope.funds = res.data;
        // select the first item
        $scope.fundSelected[0] = $scope.funds[0];
      });
    }
  }]);
