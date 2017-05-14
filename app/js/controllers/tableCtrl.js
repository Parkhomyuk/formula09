/*
function Ctrl() {
     var vmn=this;
    vmn.templates =
        [ { name: 'template1.html', url: 'template1.html'}
            , { name: 'template2.html', url: 'template2.html'} ];
    vmn.template = vmn.templates[0];
}*/
angular.module('app')
    .controller('tableCtrl',function Ctrl($scope) {
    $scope.templates =
             [ { name: 'auxiliary_tables.html', url: 'templates/auxiliary_tables.html'}
            , { name: 'main_table.html', url: 'templates/main_table.html'} ];
    $scope.template = $scope.templates[0];
});