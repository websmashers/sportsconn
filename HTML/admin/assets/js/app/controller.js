$(document).ready(function () {
    angular.bootstrap(document, ['App']);
});

//var app = angular.module('App', ['ui.bootstrap']);

var app = angular.module('App', ['localytics.directives','ui.bootstrap']).config([
    '$parseProvider', function($parseProvider) {
      return $parseProvider.unwrapPromises(true);
    }
]);

//For check every request response if login session key expire then redirect to login page
app.config(function($httpProvider) {
  $httpProvider.interceptors.push(function() {
    return {
        request: function($config) {
            $config.headers['AdminLoginSessionKey'] = $('#AdminLoginSessionKey').val();
            
            return $config;
        },
        response: function(response) {
            /* This is the code that transforms the response. `res.data` is the
             * response body */
            if(response.data.ResponseCode == 502){
                alert("Your login key expire. Please login again!!");
                signout();
            }
            return response;
        }
    };
  });
});
  
/*
* Controller(s)
*/
app.run(function ($rootScope, $location) {
    $rootScope.location = $location;
});
app.directive('repeatDone', function() { 
    return function(scope, element, attrs) {
        if (scope.$last) { // all are rendered
            scope.$eval(attrs.repeatDone);
        }
    }
});


