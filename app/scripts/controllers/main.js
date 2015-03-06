'use strict';
var app = angular.module('angularDashboardApp');

app.controller('MyCtrl', function($scope, TestData) {
    $scope.columns = [{
        field: 'name',
        displayName: 'Type',
        pinned: true,
        width: 100
    }, {
        field: 'value',
        displayName: 'Value',
        cellTemplate: '<div class="getData" my-data="row.getProperty(col.field)" highcharts="row.getProperty(col.field)"></div>',
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
        TestData[idx].value.series[0].data = randomData();
        $scope.myData.push(TestData[idx]);
    }


    $scope.addPortfolio = function() {
        $scope.columns.push({
            field: 'value2',
            displayName: 'Value2',
            cellTemplate: '<div class="getData" my-data="row.getProperty(col.field)" highcharts="row.getProperty(col.field)"></div>',
            width: 350
        });
        for (var i = 0; i < $scope.myData.length; i++) {
            $scope.myData[i].value2 = angular.copy($scope.myData[i].value);
            $scope.myData[i].value2.series[0].data = randomData();
        }
        console.log($scope.myData);
        gridLayoutPlugin.updateGridLayout();
    }

    function randomData() {
        var data = [];
        for (var i = 0; i < 5; i++) {
            data.push(Math.ceil(Math.random() * 20));
        }
        return data;
    }

});

app.directive('getData', function() {

    return {
        restrict: 'C',
        replace: true,
        transclude: true,
        scope: {
            myData: '=myData',
            highcharts: '=highcharts'
        },
        template: '<div ng-switch on="myData">' +
            '<div ng-switch-when="4" class="real"><img src="http://placehold.it/350x150"></div>' +
            '<div ng-switch-when="5" class="false"><highchart id="chart1" config="highcharts"></highchart></div>' +
            '<div ng-switch-default class="grid"><highchart id="chart2" config="highcharts"></highchart></div>' +
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
        value: '4'
    }, {
        name: "Risk",
        age: 43,
        pin: 345,
        value: {
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
            loading: false
        }
    }, {
        name: "Returns",
        value: {
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
