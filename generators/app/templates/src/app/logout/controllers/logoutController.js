class LogoutController {
    // @ngInject
    constructor(logoutService){
        this.LogoutService=logoutService;
    }

    $onInit(){

    }

    logout(){
        this.LogoutService.logout();
    }
}

export default LogoutController;
