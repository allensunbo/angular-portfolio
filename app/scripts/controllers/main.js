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
    }];
    $scope.myData = [];
    $scope.gridOptions = {
        data: 'myData',
        enablePinning: true,
        columnDefs: 'columns',
        enableRowReordering: true,
        enableColumnReordering: true,
        rowHeight: 100,
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
});

app.factory('TestData', function() {
    return [{
        name: "Moroni",
        age: 50,
        pin: 123
    }, {
        name: "Tiancum",
        age: 43,
        pin: 345
    }, {
        name: "Jacob",
        age: 27,
        pin: 567
    }, {
        name: "Nephi",
        age: 29,
        pin: 789
    }, {
        name: "Enos",
        age: 34,
        pin: 12
    }];

});
