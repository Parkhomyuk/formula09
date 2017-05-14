function firstCtrl() {
    vmn = this;
    vmn.settings = {
        title:{title:"Members"},
        columns: {
            id: {
                title: 'ID',
                type: 'number',
                class: 'first'
            },
            role_id: {
                title: 'role ID',
                type: 'number',
                class: 'second'
            },
            username: {
                title: 'user name',
                type: 'string',
                class: 'third'
            },
            password: {
                title: 'password',
                type: 'string',
                class: 'fourth'
            },
            first_name: {
                title: 'first name',
                type: 'string',
                class: 'fifth'
            },
            last_name: {
                title: 'last name',
                type: 'string',
                class: 'sixth'
            },
            middle_name: {
                title: 'middle name',
                type: 'string',
                class: 'seventh'
            },
            birthday: {
                title: 'birthday',
                type: 'number',
                class: 'eighth'
            },
            status: {
                title: 'status',
                type: 'number',
                class: 'tinth'
            },
            email: {
                title: 'email',
                type: 'string',
                class: 'tenth'
            },
            new_email: {
                title: 'new email',
                type: 'string',
                class: 'eleventh'
            },
            telephon_number: {
                title: 'phone number',
                type: 'string',
                class: 'twelfth'
            },
        }
    };
    vmn.addUser={visible : false};
    vmn.updateUser={visible : false};
    vmn.templates='templates/dashboard.html';

    vmn.menu1= function(str){
        if(str=='home'){
            return vmn.templates = 'templates/dashboard.html';
        }
        if(str=='resources'){
            return vmn.templates ='templates/auxiliary_tables.html';
        }
        if(str=='members'){
            return vmn.templates ='templates/main_table.html';
        }
        if(str=='calendar'){
            return vmn.templates ='templates/calendar.html';
        }
        else {
            return vmn.templates = 'templates/auxiliary_tables.html';
        }
    };
    vmn.upAddUpdate=function(str){
        if(str=='add'){
            console.log('add');

            vmn.addUser={visible : true};

        }
        if(str=='update'){
            console.log('update');
            return vmn.updateUser={visible : true};

        }
    }
    vmn.closeAddUpdate=function(str){
        if(str=='add'){
            console.log('closeaad');

            vmn.addUser={visible : false};

        }
        if(str=='update'){
            console.log('update');
            return vmn.updateUser={visible : false};

        }
    }


    vmn.refresh=function(){
        vmn.items=ExpressService.get();
        console.log(vmn.items);
    }


    vmn.data = [];


}
angular.module('app')
    .controller('firstCtrl',[firstCtrl])
    .directive('calendar', function() {
        return {
            // Restrict it to be an attribute in this case
            restrict: 'A',
            // responsible for registering DOM listeners as well as updating the DOM
            link: function(scope, element, attrs) {
                $(element).fullCalendar(scope.$eval(attrs.calendar));



            }
        };
    });


