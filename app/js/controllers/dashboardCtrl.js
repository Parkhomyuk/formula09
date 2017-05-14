 angular.module('app')
     .controller('dashboardCtrl',function( $interval,$filter, $http, $q){
         var vmn=this;
         vmn.clock=new Date();
         vmn.colon=':';

         var stop = $interval(function() {
              vmn.clock=new Date();

         }, 5000);
         var colon1 = $interval(function() {
             if(vmn.colon=='  '){
                 vmn.colon=':';

             }else{
                 vmn.colon='  ';
            }
         }, 1000);





     })
