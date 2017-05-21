
 var app = angular.module('app');


 app.controller('sideBarCtrl', function($scope, $http) {
  //pagination varibale//
  $scope.numberRows = 100;
  $scope.pageNumber = 0;
  $scope.pageNumberView = 1;
  $scope.pageNumberInRow = 10;
  $scope.chooseCountNumber = [100, 25, 50, 200];
  /* $scope.viewPagin={visible : true};*/
  //end pagination varibale//
  //search varibale//
  $scope.inputFirst_name = undefined;
  $scope.inputId = undefined;
  $scope.inputRole = undefined;
  $scope.inputUser_name = undefined;
  $scope.inputPassword = undefined;
  $scope.inputLast_name = undefined;
  $scope.inputMiddle_name = undefined;
  $scope.inputBirthday = undefined;
  $scope.inputEmail = undefined;
  $scope.inputNew_Email = undefined;
  $scope.inputTelephon_number = undefined;
  $scope.inputStatus = undefined;
  $scope.str = '';
  $scope.strSort = '';
  $scope.sortDirection = '';

  // end search varibale//


  $scope.refresh = function () {


   $scope.search();



  }
 /* $scope.setPage = function (page,direction) {

   $scope.pageNumber = page - 1;
   console.log(page);
   $scope.sortDirection=direction;
   console.log($scope.sortDirection);

  }*/
  $scope.pageRight = function () {
   if ($scope.pageNumber <= $scope.array.length) {
    $scope.pageNumber = $scope.pageNumber + 1;
    $scope.pageNumberView = $scope.pageNumberView + 1;
    $scope.arrayCountPage = $scope.array.slice($scope.pageNumber, $scope.pageNumber + $scope.pageNumberInRow);
    console.log($scope.pageNumber);
   }
  }
  $scope.pageLeft = function () {
   if ($scope.pageNumber >= 1) {
    $scope.pageNumber = $scope.pageNumber - 1;
    $scope.pageNumberView = $scope.pageNumberView - 1;
    $scope.arrayCountPage = $scope.array.slice($scope.pageNumber, $scope.pageNumber + $scope.pageNumberInRow);
    console.log($scope.pageNumber);
   }
  }


  $scope.$watch('numberRows', function (newValue, oldValue) {
   $scope.refresh();
  });


  $scope.$watch('pageNumber', function (newValue, oldValue) {
   $scope.pageNumberView = $scope.pageNumber + 1;
  });

  $scope.search = function () {
   $scope.lag = $scope.pageNumber * $scope.numberRows;
   $scope.str = '';
   $scope.strSort = '';
   var string = '';

   var strEmpty=true;

   var arr = {
    'id': this.inputId,
    'id_role': this.inputRole,
    'password': this.inputPassword,
    'first_name': this.inputFirst_name,
    'last_name': this.inputLast_name,
    'middle_name': this.inputMiddle_name,
    'birthday': this.inputBirthday,
    'email': this.inputEmail,
    'new_email': this.inputNew_email,
    'telephone_number': this.inputTelephon_number,
    'status': this.inputStatus
   };

   for (var key in arr) {
     console.log(typeof (arr[key]));
    if (arr.hasOwnProperty(key)) {
     if (arr[key] != undefined) {
      if (arr[key].length != 0) {
       /* $scope.str+=+" "+key+" like "+"'"+arr[key]+"xoxxooxl and"*/
       string += +" " + key + " like " + "'" + arr[key] + "xoxxooxl and"

       strEmpty = false;
       console.log('str - ' + strEmpty);
      }
     }

    }
   }
   if(strEmpty==true){
    console.log('str2 - ' +strEmpty);
    string='';
   }
   var f = string.replace(/0/g, ' ');
   var fq = f.slice(0, -3);
   $scope.str = fq;
   $scope.strSort = fq;

   if ($scope.str != '') {
    /*$scope.lag=0;*/
    $scope.str2 = "select * from user where " + $scope.str;
   $scope.str = "select * from user where " + $scope.str + ' LIMIT ' + $scope.lag + ', ' + (Number.parseInt($scope.numberRows));



    $http.get('/api/members/search/' + $scope.str).then(function (data) {
     $scope.items = data;
     $scope.pageNumber=0;
     console.log($scope.pageNumber+' first page');


    });
    $http.get('/api/members/search/' + $scope.str2).then(function (data) {

     console.log(' str2 c'+$scope.str2);

     var value = data.data.length;

     console.log(' str2 c '+  data.data.length);
     $scope.count = value;
     console.log($scope.count +'this is count');

     $scope.numberPages = Math.ceil(+$scope.count / $scope.numberRows);


     $scope.array = [];
     for (var i = 1; i < Math.ceil($scope.count / $scope.numberRows) + 1; i++) {
      $scope.array.push(i);
     }
     $scope.arrayCountPage = $scope.array.slice($scope.pageNumber, $scope.pageNumber + $scope.pageNumberInRow);



    });



   }

   else {

    $scope.str2 = "select * from user   ";
    $scope.str = "select * from user   LIMIT " + $scope.lag + ', ' + (Number.parseInt($scope.numberRows));


    $http.get('/api/members/search/' + $scope.str).then(function (data) {
     $scope.items = data;


    });

    $http.get('/api/members/count').then(function (data) {
     var value = Object.values(data.data[0]);
     $scope.count = value[0];
     console.log($scope.count);

     $scope.numberPages = Math.ceil(+$scope.count / $scope.numberRows);


     $scope.array = [];
     for (var i = 1; i < Math.ceil($scope.count / $scope.numberRows) + 1; i++) {
      $scope.array.push(i);
     }
     $scope.arrayCountPage = $scope.array.slice($scope.pageNumber, $scope.pageNumber + $scope.pageNumberInRow);


    });


   }

   console.log($scope.str);
  }

  $scope.orderUsersUp= function(paramup,direction)
  {
   var stringQuery=''
   var stringQuerySort=''
   if($scope.strSort!='') {
    console.log($scope.str + ' $scope.str');
    console.log($scope.numberRows + ' $scope.numberRows');
    console.log($scope.pageNumber + ' $scope.pageNumber');
    //noinspection TypeScriptUnresolvedFunction
    console.log('paramsUP ' + paramup);
    stringQuery= 'select * from user where '+$scope.strSort +' ORDER BY '+paramup +' '+direction +' LIMIT '+$scope.lag + ', ' + (Number.parseInt($scope.numberRows));
    stringQuerySort= 'select * from user where '+$scope.strSort +' ORDER BY '+paramup ;
   }else {

    //noinspection TypeScriptUnresolvedFunction
    stringQuery = 'select * from user ORDER BY ' + paramup+ '  LIMIT '+$scope.lag + ', ' + (Number.parseInt($scope.numberRows));
    stringQuerySort = 'select * from user ORDER BY ' + paramup;
   }
  /* $http.get('/api/members/up/'+paramup).then(function (data) {
    $scope.items = data;
   });*/
   $http.get('/api/members/up/'+stringQuery).then(function (data) {
    $scope.items = data;
   });
   $scope.pagination(stringQuerySort);
   $scope.setPage(page, $scope.orderUsersUp(paramup,direction));

  }

  $scope.pagination=function(query){
   $http.get('/api/members/search/' + query).then(function (data) {



    var value = data.data.length;

    console.log(' data.lenght '+  data.data.length);
    $scope.count = value;

    $scope.numberPages = Math.ceil(+$scope.count / $scope.numberRows);


    $scope.array = [];
    for (var i = 1; i < Math.ceil($scope.count / $scope.numberRows) + 1; i++) {
     $scope.array.push(i);
    }
    $scope.arrayCountPage = $scope.array.slice($scope.pageNumber, $scope.pageNumber + $scope.pageNumberInRow);



   });


  }
  $scope.setPage = function (page,queryPage) {
   if(page==null){
    page=1;
   }

   $scope.pageNumber = page - 1;
   console.log(page);
   console.log(queryPage+' queryPage');
   queryPage;
  }


  $scope.refresh();

 });
