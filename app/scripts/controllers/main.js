'use strict';
var app = angular.module('angularDashboardApp');

app.controller('MyCtrl', function($scope, TestData) {
    $scope.columns = [{
        field: 'name',
        displayName: 'New Name',
        pinned: true
    }, {
        field: 'age',
        displayName: 'New Age'
    }, {
        field: 'pin',
        displayName: 'Pin'
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
            case 'Return':
                idx = 2;
                break;
            default:
                idx = 0;
                break;

        }
        $scope.myData.push(TestData[idx]);
    }

    /*$scope.highcharts = {
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
        title: {
            text: 'Hello'
        },
        loading: false
    }*/
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
            '<div ng-switch-default class="grid"><highchart id="chart1" config="highcharts"></highchart></div>' +
            '</div>'
    }

});

app.factory('TestData', function() {
    return [{
        name: "Moroni",
        age: 50,
        pin: 123,
        value: '4'
    }, {
        name: "Tiancum",
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
            title: {
                text: 'Hello'
            },
            loading: false
        }
    }, {
        name: "Jacob",
        age: 27,
        pin: 567,
        value: {
            options: {
                chart: {
                    type: 'pie'
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
            title: {
                text: 'Hello'
            },
            loading: false
        }
    }, {
        name: "Nephi",
        age: 29,
        pin: 789,
        value: '7'
    }, {
        name: "Enos",
        age: 34,
        pin: 12,
        value: '8'
    }];

});
