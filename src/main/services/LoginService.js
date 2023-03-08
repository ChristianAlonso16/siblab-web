import axios from 'axios'

export const LoginService = async (form) =>{
        console.log('HOLA DESDE SERVICE',form.username);
        const url = 'http://localhost:8080/api-siblab/login/';
        const formLogin = new FormData();
        formLogin.append('username', form.username);
        formLogin.append('password', form.password);
        formLogin.append("METHOD", "POST");
        const response = await axios.post(url,formLogin);
        return response;
} 