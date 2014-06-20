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

    $scope.generatePdf = function() {
      var doc = new jsPDF('p','in','letter');
      // let's set the title for the pdf
      doc.setFontSize(22);
      doc.text(20, 20, 'Fondos');
      var margin = 0.5 // inches on a 8.5 x 11 inch sheet.
      var verticalOffset = margin
      var separator = 35;

      // let's iterate for every fund
      angular.forEach($scope.funds, function(f) {
        // insert the fund title
        doc.setFontSize(16);
        doc.text(20, separator, f.nombre);

        // set font size for the description and add a space between the title
        doc.setFontSize(12);
        separator += 10;
        angular.forEach(f, function(value, key){
          if(value !== null && value.length > 1) {
            // var property = key + ': ' + value;
            // insert the fund description
            var lines = doc.setFont('Times', 'Roman')
                  .setFontSize(14)
                  .splitTextToSize(value.toString(), 7.5);
            doc.text(0.5, verticalOffset, lines);
            verticalOffset += (lines.length + 0.5) * 14 / 72;
          }
        });
        doc.addPage();
        separator += 20; // add a space between lines
      });

      // open the document in a new window
      doc.output('dataurlnewwindow');
      // doc.save('test.pdf');
    };


  }]);
