var module = angular.module('<%= nameUpperCamelCase %>Module', [
  //import modules
]);

import <%= nameLowerCamelCase %>Tpl from './views/<%= nameLowerCamelCase %>.html';
import <%= nameLowerCamelCase %>Ctrl from './controllers/<%= nameLowerCamelCase %>Controller';
import <%= nameLowerCamelCase %>Fctr from './services/<%= nameLowerCamelCase %>Factory';

import './<%= nameLowerCamelCase %>.scss';

module.service('<%= nameLowerCamelCase %>Factory', <%= nameLowerCamelCase %>Fctr);
module.config(function ($stateProvider, $urlRouterProvider) {
    "ngInject";

    $stateProvider
        .state('<%= name %>', {
            url: '/<%= nameLowerCamelCase %>',
            views: {
                '@': {
                    template: <%= nameLowerCamelCase %>Tpl,
                    controller: <%= nameLowerCamelCase %>Ctrl,
                    controllerAs: '<%= nameLowerCamelCase %>'
                }
            }
        })


});
