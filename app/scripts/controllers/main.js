'use strict';
var app =
    angular.module('angularDashboardApp');
app.controller('MyCtrl', function($scope) {
    $scope.columns = [];
    $scope.columns[true] = [{
        field: 'name',
        displayName: 'Name'
    }, {
        field: 'age',
        displayName: 'Age'
    }];
    $scope.columns[false] = [{
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
    $scope.displayFlag = true;
    $scope.columnsSelected = $scope.columns[$scope.displayFlag];
    $scope.myData = [{
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
    $scope.gridOptions = {
        data: 'myData',
        enablePinning: true,

        columnDefs: 'columnsSelected',
        enableRowReordering: true,

        enableColumnReordering: true,
        rowHeight: 100,
        plugins: [new ngGridFlexibleHeightPlugin()]

    };

    $scope.update_columns = function($event) {
        $scope.displayFlag = !$scope.displayFlag;
        $scope.columnsSelected = $scope.columns[$scope.displayFlag];
    }
});
