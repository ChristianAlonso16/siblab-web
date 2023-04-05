import { onFail } from '../utils/Alerts';
import apiUrl from '../utils/AppUrl';

export const LoginService = async (form) => {
        console.log('HOLA DESDE SERVICE', form.username);
        const formLogin = new FormData();
        formLogin.append('username', form.username);
        formLogin.append('password', form.password);
        formLogin.append("METHOD", "POST");
        try {
                const response = await apiUrl.post("/login/", formLogin);
                return response;
        } catch (error) {
                console.log('error desde loginSrvice', error)
                onFail("Usuario o contraseña incorrectos");
        }

} 