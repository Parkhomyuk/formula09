    /*angular.module('app')
        .factory('ExpressService', ['$http', function($http){

        var onError = function(data) {
            data.errors = data;

        };

        function get() {
            return $http.get("/api/members").success(function (data) {
                vmn.members = data;
                console.log(vmn.members);
            });
        }

        return {
            get: get
        };

    }]);
*/
    function expressServ($http){
        var onError = function(data) {
            data.errors = data;

        };

        function get() {
            return $http.get("/api/members").success(function (data) {
                vmn.members = data;
                console.log(vmn.members);
            });
        }

        return {
            get: get
        };

    }

    angular.module('app')
        .factory('ExpressService', ['$http', expressServ]);

