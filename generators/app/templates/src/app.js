/**
 * Created by Programador RRHH-2.
 */
window.jQuery = require('jquery');

require('bootstrap-sass');
import 'angular';
import 'angular-ui-router';
import 'angular-resource';
import '../node_modules/angular-ui-bootstrap/dist/ui-bootstrap';
import '../node_modules/angular-ui-notification/dist/angular-ui-notification.min';
import '../bower_components/sweetalert/dist/sweetalert.min';
import '../node_modules/ng-sweet-alert/ng-sweet-alert';
import '../node_modules/angular-loading-bar/build/loading-bar.min';
import './libs/angular-local-storage.min';

import './app.scss';

import './app/login/loginModule';
import './app/logout/logoutModule';
import './app/home/homeModule';


var App = angular.module('App', [
    'ng-sweet-alert',
    'ui.router',
    'ui-notification',
    'ngResource',
    'angular-loading-bar',
    'LocalStorageModule',
    'LoginModule',
    'LogoutModule',
    'HomeModule'
]);

App.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    "ngInject";

    $locationProvider.html5Mode(false);

    $stateProvider
        .state('app', {
            url: '',
            abstract: true
        });

    $urlRouterProvider.otherwise('/login');
    // $urlRouterProvider.when('/home', '/home/administrador');

});

App.constant("config", {
    "apiServer": "http://example:8080/api/private/"
});


App.factory('AppInterceptor', ['$q', '$location', function($q, $location){
    return {
        'responseError': function (rejection) {

            var defer = $q.defer();

            if (rejection.status == 401) {
                console.log("rejection: ",rejection);
                $location.path('/login');
            }

            defer.reject(rejection);

            return defer.promise;

        }
    };

}]);

App.config(['$httpProvider', 'config', function($httpProvider){

    $httpProvider.defaults.withCredentials = true;
    $httpProvider.interceptors.push('AppInterceptor');
    $httpProvider.interceptors.push(['$q', 'localStorageService','$location' , function ($q, localStorageService,location) {
        return {
            request: function(httpConfig) {
                var jsonAuxLog = localStorageService.get('jsonAuxLog') || {};
                if(jsonAuxLog.token){
                    httpConfig.headers['token'] = localStorageService.get('jsonAuxLog').token;
                    if(!(location.path()=='/' || location.path() =='/login')){
                        httpConfig.headers['usuario'] = localStorageService.get('jsonAuxLog').usuario;
                    }
                    httpConfig.headers['aplicacion'] = localStorageService.get('jsonAuxLog').aplicacion;
                    httpConfig.headers['ip'] = localStorageService.get('jsonAuxLog').ip;
                }
                return httpConfig;
            },
            responseError: function (response) {
                return $q.reject(response);
            }
        }

    }]);

}]);

App.config(['cfpLoadingBarProvider', function (configLoaderProvider) {
    configLoaderProvider.latencyThreshold = 50;
    configLoaderProvider.includeBar = false;
}]);
//
// App.config(['$qProvider', function ($qProvider) {
//     $qProvider.errorOnUnhandledRejections(false);
// }]);
