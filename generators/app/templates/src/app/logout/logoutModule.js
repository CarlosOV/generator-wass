/**
 * Created by Programador RRHH-2.
 */
var module = angular.module('LogoutModule', [
  //import modules
]);

import logoutSrv from './services/logoutService';

module.service("logoutService", logoutSrv);
