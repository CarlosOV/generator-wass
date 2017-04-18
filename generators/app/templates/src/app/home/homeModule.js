/**
 * Created by Programador RRHH-2.
 */
var module = angular.module('HomeModule', [
  //import modules
]);

import homeTpl from './views/home.html';
import homeCtrl from './controllers/homeController';
import './home.scss';

import homeFctr from './services/homeFactory';

module.service('homeFactory', homeFctr);

module.config(function ($stateProvider) {
    "ngInject";

    $stateProvider
        .state('home', {
            parent: 'app',
            url: '/home',
            views: {
                '@': {
                    template: homeTpl,
                    controller: homeCtrl,
                    controllerAs: 'home'
                }
            }
        })

});
