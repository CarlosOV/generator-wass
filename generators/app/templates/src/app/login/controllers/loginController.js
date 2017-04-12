/**
 * Created by Programador RRHH-2.
 */
class LoginController {
    // @ngInject
    constructor($state, authService, Notification, SweetAlert, logoutService){
        this.state=$state;
        this.AuthService=authService;
        this.Notification = Notification;
        this.SweetAlert = SweetAlert;
        this.LogoutService = logoutService;
    }

    $onInit(){
        console.log("initLogin");
        this.acceso = {
            logo: require('../../../img/logo_home.png'),
            emailSuffix: '@unmsm.edu.pe'
        };
    }

    reLogin(user){
        this.SweetAlert.confirm("Tiene un sesión activa en otra computadora ¿Desea cerrarla?",
            {
                title: "Mensaje",
                cancelButtonText: "Cancelar",
                confirmButtonText: "Aceptar"
            })
            .then((response)=>{
                if(response){
                    this.LogoutService.logout(true, {usuario: user.usuario.replace('@unmsm.edu.pe','')+"@unmsm.edu.pe"}, ()=>{
                        this.login(user);
                        console.log("confirm success")
                    });
                }
            })
    }

    login(user){
        console.log("user: ", user);
        var datajson = {
            "usuario": user.usuario,
            "password": user.password
        };
        this.AuthService.login(datajson).then(
            function(data) {
                this.AuthService.redirectPath(data);
            }.bind(this),
            function(err) {
                if(err.codigo == 409){
                    this.reLogin(user);
                }
                else if(err.codigo == 401){
                    this.clase="";
                    this.mensaje = err.mensaje;
                }
                else{
                    this.Notification.error({title: '<i> Error</i>', message: '<b>No se pudo Iniciar Sesión. </b><i>Inténtelo más tarde</i>'});
                }
            }.bind(this)
        );
        // this.state.go('home')
    }

}

export default LoginController;
