import { onFail } from '../utils/Alerts';
import apiUrl from '../utils/AppUrl';

export const LoginService = async (form) => {
        const formLogin = new FormData();
        formLogin.append('username', form.username);
        formLogin.append('password', form.password);
        formLogin.append("METHOD", "POST");
        try {
                const response = await apiUrl.post("/login/", formLogin);
                const user = await apiUrl.get(`/user/${response.data.id}`)
                console.log(user);
                if(response.data.role === 'Student') throw 'student';
                if(!user.data.data.status) throw 'disabled'
                return response;
        } catch (error) {
                console.log('error desde loginSrvice', error)
                error === 'student' ?
                onFail('Estudiantes no permitidos en esta plataforma') : error === 'disabled' ?
                onFail('Docente deshabilitado') :
                onFail("Usuario o contraseña incorrectos");
        }

} 