import axios from "axios";
import { onFail, onSuccess } from "../../main/utils/Alerts";
import apiUrl from "../../main/utils/AppUrl";

export const RegisterC = async (form) => {
    
    console.log('Hola desde classservice', form);
    try {
        const datacClassrom = {
            name: form.values.name,
            career: form.values.career,
            grade: form.values.grade,
            period: {id:form.idPeriod},
        };
       const url = 'http://localhost:8080/api-siblab/classroom/';
     
       const response = await apiUrl.post('http://localhost:8080/api-siblab/classroom/',datacClassrom);
       onSuccess("Registrado correctamente")
       return response;
    } catch (error) {
        console.log("eror de tService",error)
        onFail("Fallo la operacion")

    }
}
export const GetC = async () => {
    try {
        const url = 'http://localhost:8080/api-siblab/classroom/';
        const response = await apiUrl.get(url);
        return response.data.data;
    } catch (error) {
        console.log("Error desde getC",error)
    }
}
