import axios from "axios";

export const RegisterT = async (form) => {
    
    console.log('Hola desde service', form.name);
    try {
        const dataTeacher = {
            name: form.name,
            surname: form.surname,
            email: form.email,
            password: form.password,
            role: 'Teacher'
        };
       const url = 'http://localhost:8080/api-siblab/user/';
       const response = await axios.post(url,dataTeacher);
       return response;
    } catch (error) {
        console.log("eror de tService",error)
    }
  
}
