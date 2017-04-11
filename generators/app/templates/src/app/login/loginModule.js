var module = angular.module('LoginModule', []);

import loginTpl from './views/login.html';
import './login.scss';
import loginCtrl from './controllers/loginController';
import authSrv from './services/authService';

module.service('authService', authSrv);
module.config(function ($stateProvider, $urlRouterProvider) {
    "ngInject";

    $stateProvider
        .state('login', {
            parent: 'app',
            url: '/login',
            views: {
                '@': {
                    template: loginTpl,
                    controller: loginCtrl,
                    controllerAs: 'login'
                }
            }
        })

});