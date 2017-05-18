
 var app = angular.module('app');


 app.controller('sideBarCtrl', function($scope, $http) {
  //pagination varibale//
  $scope.numberRows=100;
  $scope.pageNumber=0;
  $scope.pageNumberView=1;
  $scope.pageNumberInRow=10;
  $scope.chooseCountNumber=[100,25,50,200];
 /* $scope.viewPagin={visible : true};*/
  //end pagination varibale//
  //search varibale//
  $scope.inputFirst_name=undefined;
  $scope.inputId=undefined;
  $scope.inputRole=undefined;
  $scope.inputUser_name=undefined;
  $scope.inputPassword=undefined;
  $scope.inputLast_name=undefined;
  $scope.inputMiddle_name=undefined;
  $scope.inputBirthday=undefined;
  $scope.inputEmail=undefined;
  $scope.inputNew_Email=undefined;
  $scope.inputTelephon_number=undefined;
  $scope.inputStatus=undefined;
  $scope.str='';
 // end search varibale//


 $scope.refresh = function () {



 // HTTP GET
 // получение всех данных через GET запрос по адрес хранящемуся в baseUrl

 /* $http.get('/api/members/page'+$scope.numberRows ).then(function (data) {
  $scope.items=data;
   console.log( $scope.numberRows);

  });*/
  /*$http.get('/api/members/page'+'select * from user LIMIT '+ $scope.lag+', '+ (Number.parseInt($scope.numberRows))).then(function (data) {
  $scope.items=data;
   console.log( $scope.numberRows);

  });*/
  $scope.search();

 /* $http.get('/api/members/count').then(function (data) {
   var value=Object.values(data.data[0]);
   $scope.count=value[0];
   console.log($scope.count);

   $scope.numberPages=Math.ceil(+$scope.count/ $scope.numberRows);



   $scope.array=[];
   for(var i=1;i<Math.ceil($scope.count/$scope.numberRows)+1;i++){
    $scope.array.push(i);
     }
   $scope.arrayCountPage= $scope.array.slice($scope.pageNumber,$scope.pageNumber+$scope.pageNumberInRow);


   });*/

 }
  $scope.setPage= function (page){

   $scope.pageNumber=page-1;
console.log(page);
   $scope.refresh();
  }
  $scope.pageRight= function () {
   if ($scope.pageNumber<=$scope.array.length) {
    $scope.pageNumber = $scope.pageNumber + 1;
    $scope.pageNumberView = $scope.pageNumberView + 1;
    $scope.arrayCountPage = $scope.array.slice($scope.pageNumber, $scope.pageNumber + $scope.pageNumberInRow);
    console.log($scope.pageNumber);
   }
  }
  $scope.pageLeft= function () {
   if ($scope.pageNumber>=1) {
    $scope.pageNumber = $scope.pageNumber - 1;
    $scope.pageNumberView = $scope.pageNumberView - 1;
    $scope.arrayCountPage = $scope.array.slice($scope.pageNumber, $scope.pageNumber + $scope.pageNumberInRow);
    console.log($scope.pageNumber);
   }
  }


  $scope.$watch('numberRows', function(newValue, oldValue){
   $scope.refresh();
  });
   $scope.$watch('items', function(newValue, oldValue){


    $http.get('/api/members/search/'+ $scope.str2).then(function (data) {
     $scope.items2 = data;
     $scope.count= $scope.items2.data.length;
     console.log($scope.items2.data.length+' ptry');
     $scope.numberPages=Math.ceil(+$scope.count/ $scope.numberRows);
    });



  });

  $scope.$watch('pageNumber', function(newValue, oldValue){
   $scope.pageNumberView=$scope.pageNumber+1;
  });

  $scope.search= function(){
   $scope.lag=$scope.pageNumber*$scope.numberRows;
   $scope.str='';

   var arr  = {
    'id':this.inputId,
    'id_role':this.inputRole,
    'password':this.inputPassword,
    'first_name':this.inputFirst_name,
    'last_name':this.inputLast_name,
    'middle_name':this.inputMiddle_name,
    'birthday':this.inputBirthday,
    'email':this.inputEmail,
    'new_email':this.inputNew_email,
    'telephone_number':this.inputTelephon_number,
    'status':this.inputStatus
   };
   var string='';
   for (var key in arr) {

    if (arr.hasOwnProperty(key)) {
     if(arr[key]!=undefined){
     /* $scope.str+=+" "+key+" like "+"'"+arr[key]+"xoxxooxl and"*/
      string+=+" "+key+" like "+"'"+arr[key]+"xoxxooxl and"
    console.log('str - '+ $scope.str);
     }


    }
   }
   var f=string.replace(/0/g,' ');
   var fq=f.slice(0,-3);
    $scope.str=fq;

   if($scope.str!='') {

    $scope.str2="select * from user where "+ $scope.str;
    $scope.str="select * from user where "+ $scope.str+' LIMIT '+ $scope.lag+', '+ (Number.parseInt($scope.numberRows));


    $http.get('/api/members/search/'+ $scope.str).then(function (data) {
     $scope.items = data;


   });
    $http.get('/api/members/search/'+ $scope.str2).then(function (data) {
     $scope.items2 = data;
     $scope.count= $scope.items2.data.length;
     console.log($scope.items2.data.length+' ptry');
    });
   /*console.log( $scope.str2);
    $http.get('/api/members/count'+ $scope.str2).then(function (data) {*/
    /* var value=Object.values(data.data[0]);*/



     console.log($scope.count+' posmotry');

     $scope.numberPages=Math.ceil(+$scope.count/ $scope.numberRows);



     $scope.array=[];
     for(var i=1;i<Math.ceil($scope.count/$scope.numberRows)+1;i++){
      $scope.array.push(i);
     }
     $scope.arrayCountPage= $scope.array.slice($scope.pageNumber,$scope.pageNumber+$scope.pageNumberInRow);


    /*});*/

    }

   else{
   /* $scope.viewPagin={visible : true};
    $scope.refresh();*/
    $scope.str2="select * from user   ";
    $scope.str="select * from user   LIMIT "+ $scope.lag+', '+ (Number.parseInt($scope.numberRows));


    $http.get('/api/members/search/'+ $scope.str).then(function (data) {
     $scope.items = data;
    });

    $http.get('/api/members/count').then(function (data) {
     var value=Object.values(data.data[0]);
     $scope.count=value[0];
     console.log($scope.count);

     $scope.numberPages=Math.ceil(+$scope.count/ $scope.numberRows);



     $scope.array=[];
     for(var i=1;i<Math.ceil($scope.count/$scope.numberRows)+1;i++){
      $scope.array.push(i);
     }
     $scope.arrayCountPage= $scope.array.slice($scope.pageNumber,$scope.pageNumber+$scope.pageNumberInRow);


    });



   }

   console.log($scope.str);
  }


  $scope.refresh();

 });
