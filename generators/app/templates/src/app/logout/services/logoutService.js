/**
 * Created by Programador RRHH-2.
 */
class LogoutService{
    // @ngInject
    constructor($state, config, localStorageService, Notification){
        this.state=$state;
        this.config=config;
        this.localStorageService = localStorageService;
        this.Notification = Notification;

        this.init();
    }

    init(){

    }

    logout(noReload, opt, callback){
        var auxiliar = this.localStorageService.get('jsonAuxLog') || opt || {};
        var url = this.config.logoutApi ;
        return window.jQuery.ajax({
            url: url,
            method: "POST",
                headers: {
                'Content-Type': "application/json",
                'usuario': auxiliar.usuario,
                'aplicacion':103,
                'ip': this.localStorageService.get("ip") == undefined ? '' : this.localStorageService.get("ip"),
                'token': auxiliar.token
            }
        }).success(function(){
            var ip = this.localStorageService.get("ip");
            localStorage.clear();
            this.localStorageService.set("ip", ip);
            if(callback) callback();
            if(noReload) return;
            this.state.go('login');
        }.bind(this))
        .error(function(){
            this.Notification.error({title: '<i> Error</i>', message: '<b>No se pudo finalizar la Sesión. </b><i>Inténtelo más tarde</i>'});
        }.bind(this));
    }
}

export default LogoutService;
