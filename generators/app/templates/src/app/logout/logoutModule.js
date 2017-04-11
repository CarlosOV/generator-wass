var module = angular.module('LogoutModule', []);

import logoutSrv from './services/logoutService';

module.service("logoutService", logoutSrv);