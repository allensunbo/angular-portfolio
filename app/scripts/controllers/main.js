'use strict';
var app = angular.module('angularDashboardApp');

app.controller('MyCtrl', function($scope, TestData) {
    $scope.columns = [{
        field: 'name',
        displayName: 'Type',
        pinned: true,
        width: 100,
        cellTemplate: '<div>{{row.getProperty(col.field)}}<button ng-click="removeRow(row)" class="pull-right">x</button></div>',
    }, {
        field: 'value',
        displayName: 'portfolio 1',
        cellTemplate: '<div class="renderer" cell-content="row.getProperty(col.field)" highcharts="row.getProperty(col.field)"></div>',
        width: 350
    }];

    var gridLayoutPlugin = new ngGridLayoutPlugin();
    $scope.myData = [];
    $scope.gridOptions = {
        data: 'myData',
        enablePinning: true,
        columnDefs: 'columns',
        enableRowReordering: true,
        enableColumnReordering: true,
        rowHeight: 300,
        plugins: [new ngGridFlexibleHeightPlugin(), gridLayoutPlugin]
    };

    $scope.addWidget = function(event) {
        console.log('widget added');
        console.log(event.target.innerText);
        var idx = 0;
        switch (event.target.innerText) {
            case 'Summary':
                idx = 0;
                break;
            case 'Risk':
                idx = 1;
                break;
            case 'Returns':
                idx = 2;
                break;
            default:
                idx = 0;
                break;

        }
        if (TestData[idx].value.series) {
            TestData[idx].value.series[0].data = randomData();
            $scope.myData.push(TestData[idx]);
        } else {
            $scope.myData.push(TestData[idx]);
        }
        console.log($scope.myData);
    }

    $scope.addPortfolio = function() {
        var cols = $scope.columns.length;
        var fieldName = 'value' + cols;
        $scope.columns.push({
            field: fieldName,
            displayName: 'portfolio ' + cols,
            cellTemplate: '<div class="renderer" cell-content="row.getProperty(col.field)" highcharts="row.getProperty(col.field)"></div>',
            width: 350
        });
        for (var i = 0; i < $scope.myData.length; i++) {
            $scope.myData[i][fieldName] = angular.copy($scope.myData[i].value);
            if ($scope.myData[i][fieldName].series) {
                $scope.myData[i][fieldName].series[0].data = randomData();
                $scope.myData[i][fieldName].xAxis.labels.enabled = false;
            }
        }
        console.log($scope.myData);
        gridLayoutPlugin.updateGridLayout();
    }

    $scope.removeRow = function(row) {
        $scope.myData.splice(row.rowIndex, 1);
    }

    function randomData() {
        var data = [];
        for (var i = 0; i < 5; i++) {
            data.push(Math.ceil(Math.random() * 20));
        }
        return data;
    }

});

app.directive('renderer', function() {

    return {
        restrict: 'C',
        replace: true,
        transclude: true,
        scope: {
            cellContent: '=cellContent',
            highcharts: '=highcharts'
        },
        template: '<div ng-switch on="cellContent.type">' +
            '<div ng-switch-when="text" class="real">portfolio: </div>' +
            '<div ng-switch-when="bar" class="false"><highchart id="chart1" config="highcharts"></highchart></div>' +
            '<div ng-switch-when="pie" class="false"><highchart id="chart1" config="highcharts"></highchart></div>' +
            '<div ng-switch-default class="grid">Not supported</div>' +
            '</div>'
    }

});

app.factory('TestData', function() {
    function randomData() {
        var data = [];
        for (var i = 0; i < 5; i++) {
            data.push(Math.ceil(Math.random() * 20));
        }
        return data;
    }

    return [{
        name: "Summary",
        value: {
            type: 'text',
            data: '4'
        }
    }, {
        name: "Risk",
        value: {
            type: 'bar',
            options: {
                chart: {
                    type: 'bar'
                }
            },
            plotOptions: {
                bar: {
                    size: '100%'
                }
            },
            series: [{
                data: randomData()
            }],
            /* title: {
                 text: 'Risk'
             },*/
            loading: false,
            xAxis: {
                labels: {
                    formatter: function() {
                        return ['Size', 'Momentum', 'Growth', 'Country', 'Currency'][this.value];
                    }
                }
            }
        }
    }, {
        name: "Returns",
        value: {
            type: 'pie',
            options: {
                chart: {
                    type: 'pie',
                    margin: [-30, 30, 30, 30]
                }
            },
            plotOptions: {
                pie: {
                    size: '100%'
                }
            },
            series: [{
                data: randomData()
            }],
            title: {
                text: 'Returns',
                style: {
                    display: 'none',
                },
            },
            loading: false
        }
    }];

});
