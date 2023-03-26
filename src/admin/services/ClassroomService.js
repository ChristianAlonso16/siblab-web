import axios from "axios";
import apiUrl from "../../main/utils/AppUrl";

export const RegisterC = async (form) => {
    
    console.log('Hola desde classservice', form);
    try {
        const datacClassrom = {
            name: form.name,
            career: form.career,
            grade: form.grade,
            period: {id:parseInt(form.period)},
        };
       const url = 'http://localhost:8080/api-siblab/classroom/';
     
       const response = await apiUrl.post('http://localhost:8080/api-siblab/classroom/',datacClassrom);
       console.log('session',response);
       return response;
    } catch (error) {
        console.log("eror de tService",error)
    }
  
}
