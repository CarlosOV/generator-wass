class AuthService{
    // @ngInject
    constructor(localStorageService,$q,config,$state){
        this.localStorageService=localStorageService;
        this.q=$q;
        this.config=config;
        this.state=$state;
    }
    login(item) {
        var def = this.q.defer();
        var auxiliar = this.localStorageService.get('jsonAuxLog') || {};
        var request = window.jQuery.ajax({
            url: this.config.loginApi,
            method: "POST",
            headers: {
                'Content-Type': "application/json",
                'usuario': item.usuario.replace('@unmsm.edu.pe',''),
                'password': item.password,
                'aplicacion':103,
                'ip': this.localStorageService.get("ip") == undefined ? '' : this.localStorageService.get("ip")
            }
        });

        request.success(function successCallback(data, status, headers) {
             console.log("datalogin",data);
            if (data.codigo == undefined || data.codigo==null ) {
                var jsonAuxLog = {
                    usuario: data.correo,
                    aplicacion: 103,
                    ip: this.localStorageService.get("ip") == undefined ? '' : this.localStorageService.get("ip"),
                    token: headers.getResponseHeader("token")
                };
                this.localStorageService.set("dniServidor",data.dniUsuario);
                this.localStorageService.set("jsonAuxLog", jsonAuxLog);
                def.resolve(data)
            } else {
                if(data.codigo == 409){
                    def.reject(data);
                }
                else if(data.codigo == 401){
                    def.reject(data);
                }
                else{
                    def.reject();
                }
            }

        }.bind(this)).error(function errorCallback(data, status, headers, config) {
            def.reject(data);
        }.bind(this));
        return def.promise;
    }
    redirectPath(item){
        this.localStorageService.set("perfil", item.idPerfil);
        if(item.idPerfil==105){
            this.state.go('home');
        }else if(item.idPerfil==104){
            this.state.go('home.servidor', {dni: this.localStorageService.get("dniServidor")});
        }else if(item.idPerfil==103){
            this.localStorageService.set("depJefePer",item.idDependencia);
            this.state.go('home');
        }
    }

}

export default AuthService;