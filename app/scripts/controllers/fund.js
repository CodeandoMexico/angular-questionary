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
      var margin = 0.5 // inches on a 8.5 x 11 inch sheet.
      var verticalOffset = margin + 0.5;
      // let's set the title for the pdf
      addMainTitle(doc, verticalOffset);
      verticalOffset += 0.5;

      // let's iterate for every fund
      angular.forEach($scope.funds, function(f) {
        // insert the fund title
        addFundTitle(doc, verticalOffset, f);
        addFundDescription(doc, verticalOffset, f);
        doc.addPage();
      });

      // open the document in a new window
      doc.output('dataurlnewwindow');
      // doc.save('test.pdf');
    };

    function addMainTitle(doc, verticalOffset){
      // let's set the title for the pdf
      var mainTitle = doc.setFont("helvetica")
                      .setFontType("bold")
                      .setFontSize(24)
                      .splitTextToSize('Fondos', 7.5);
      doc.text(0.5, verticalOffset, mainTitle);
      verticalOffset += 0.5;
    }

    function addFundTitle(doc, verticalOffset ,f) {
      var title = doc.setFont("helvetica")
                  .setFontType("bold")
                  .setFontSize(16)
                  .splitTextToSize(f.nombre, 7.5);
      doc.text(0.5, verticalOffset, title);
    }

    function addFundDescription(doc, verticalOffset, f) {
      var properties = '\n\n';
      var propertyTitle = {
        // nombre: '\n',
        institucion: 'Institución\n',
        descripcion: 'Descripción\n',
        categoria: 'Categoría\n',
        caracteristicas: 'Características\n',
        informes: 'Informes\n',
      };
      angular.forEach(f, function(value, key){
        if(angular.isDefined(propertyTitle[key]) && value !== null && value.length > 1) {
          // insert the fund description
          properties += propertyTitle[key] + value + '\n\n';
        }
      });
      var lines = doc.setFont('Times', 'Roman')
            .setFontSize(14)
            .splitTextToSize(properties.toString(), 7.5);
      doc.text(0.5, verticalOffset, lines);
      // verticalOffset += (lines.length + 0.5) * 14 / 72;
      verticalOffset = 1;
    }


  }]);
