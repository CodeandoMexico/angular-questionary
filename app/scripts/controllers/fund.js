'use strict';

angular.module('questionaryApp')
  .controller('FundCtrl', ['$scope', '$routeParams', 'Fund', '$location', function ($scope, $routeParams, Fund, $location) {
    var category = $routeParams.category; // save value for later
    var stage = $routeParams.stage; // save value for later

    console.log($routeParams.category);
    $scope.fundSelected = [];
    $scope.funds = null;
    $scope.gridOptions = {
      data: 'funds',
      selectedItems: $scope.fundSelected,
      multiSelect: false,
      columnDefs: [
        { field: 'nombre', displayName: 'Nombre del Fondo', cellTemplate: '<div class="cell-background"><div class="ngCellText">{{row.getProperty(col.field)}}</div></div>' },
        // { field: 'institucion', displayName: 'Institución' },
        // { field: 'informes', displayName: 'Informes' }
      ]
    };

    // look if there is a category in the url, if not, return all the funds
    if(angular.isDefined(category)){
      Fund.category(category, stage).then(function(res){
        $scope.funds = res.data;
        // select the first item
        $scope.fundSelected[0] = $scope.funds[0];
      }, function(err){
        // there was an error we should redirect elsewhere
        $location.url('/404');
      });
    } else {
      Fund.all().then(function(res){
        $scope.funds = res.data;
        // select the first item
        $scope.fundSelected[0] = $scope.funds[0];
      });
    }

    $scope.generatePdf = function () {
      // var docDefinition = [{ content: 'This is an sample PDF printed with pdfMake' }];
      // pdfMake.createPdf(docDefinition).open();
      var docDefinition = {
        content: [{ text: 'Listado de fondos', style: 'title' }],
        styles: {
          title: {
            bold: true,
            fontSize: 20
          },
      		header: {
      			bold: true,
      			fontSize: 15
      		}
      	},
      	defaultStyle: {
      		fontSize: 12,
      	}
      };
      // let's iterate for every fund
      angular.forEach($scope.funds, function(f) {
        // insert the fund title
        var title = '\n' + f.nombre;
        docDefinition.content.push({ text: title, style: 'header' });
        // insert the fund description
        var fundInfo = { ol: [] };
        angular.forEach(f, function(value, key){
          if(value !== null && value.length > 1) {
            var data = value.toString();
            fundInfo.ol.push(data);
          }
        });
        docDefinition.content.push(fundInfo);
      });
      // console.log(docDefinition);
      pdfMake.createPdf(docDefinition).open();
      // pdfMake.createPdf(docDefinition).download();
    }

  }]);
