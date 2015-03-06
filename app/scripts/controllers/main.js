'use strict';
var app = angular.module('angularDashboardApp');

app.controller('MyCtrl', function($scope, TestData) {
    $scope.columns = [{
        field: 'name',
        displayName: 'Type',
        pinned: true
    }, {
        field: 'value',
        displayName: 'Value',
        cellTemplate: '<div class="getData" my-data="row.getProperty(col.field)" highcharts="row.getProperty(col.field)"></div>',
        width: 350
    }];

    $scope.myData = [];
    $scope.gridOptions = {
        data: 'myData',
        enablePinning: true,
        columnDefs: 'columns',
        enableRowReordering: true,
        enableColumnReordering: true,
        rowHeight: 300,
        plugins: [new ngGridFlexibleHeightPlugin()]
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
        $scope.myData.push(TestData[idx]);
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
                data: [10, 15, 12, 8, 7]
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
                data: [10, 15, 12, 8, 7]
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
