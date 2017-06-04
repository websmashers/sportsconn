"use strict";
var basePath = 'http://localhost/ng-projects/556-sportsconn/HTML/';
//var basePath = 'http://103.15.66.186/webdesign/556-sportsconn/';

var app = angular.module('sportsConn', ['localytics.directives', 'mgo-angular-wizard', 'matchMedia']).run(function($rootScope) {
    $rootScope.baseUrl = basePath;
});