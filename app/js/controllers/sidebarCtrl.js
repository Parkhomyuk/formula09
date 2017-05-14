var app = angular.module('app');


app.controller('sideBarCtrl', function($scope, $http) {
    $scope.refresh = function () {
        // HTTP GET
        // получение всех данных через GET запрос по адрес хранящемуся в baseUrl
        $http.get('/api/members').then(function (data) {
            $scope.items = data;
        });
        console.log('$http');
    }
});
