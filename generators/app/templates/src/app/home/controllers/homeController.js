/**
 * Created by Programador RRHH-2.
 */
class HomeController {
    // @ngInject
    constructor(homeFactory, logoutService){
        this.HomeFactory = homeFactory;
        this.LogoutService = logoutService;
    }

    $onInit(){

    }

    logout(){
        this.LogoutService.logout();
    }

}

export default HomeController;
