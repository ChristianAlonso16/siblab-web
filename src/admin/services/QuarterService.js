import axios from "axios";
import apiUrl from "../../main/utils/AppUrl";

export const RegisterQ = async (form) => {
    
    console.log('Hola desde service', form.name);
    try {
        const dataTeacher = {
            semester: form.name,
            start_semester: form.fechaInicio,
            finish_semester: form.fechaFin,
            user_id: {id:form.docente},
        };
       const url = 'http://localhost:8080/api-siblab/period/';
     
       const response = await axios.post(url,dataTeacher);
       console.log('session',response);
       return response;
    } catch (error) {
        console.log("eror de tService",error)
    }
  
}
