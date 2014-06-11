'use strict';

angular.module('questionaryApp')
  .controller('FundCtrl', ['$scope', '$routeParams', 'Fund', '$location', function ($scope, $routeParams, Fund, $location) {
    var category = $routeParams.category; // save value for later
    console.log($routeParams.category);
    $scope.fundSelected = [];
    $scope.funds = null;
    $scope.gridOptions = {
      data: 'funds',
      selectedItems: $scope.fundSelected,
      multiSelect: false,
      columnDefs: [
        { field: 'nombre', displayName: 'Nombre' },
        { field: 'institucion', displayName: 'Institución' },
        { field: 'informes', displayName: 'Informes' }
      ]
    };

    // look if there is a category in the url
    if(angular.isDefined(category)){
      Fund.category(category).then(function(res){
        $scope.funds = res.data;
        // console.log(res.data);
      }, function(err){
        // there was an error we should redirect elsewhere
        $location.url('/404');
      });
    } else {
      Fund.all().then(function(res){
        $scope.funds = res.data;
        // console.log($scope.funds);
      });
    }

  }]);
