import axios from "axios";
import { onFail, onSuccess } from "../../main/utils/Alerts";
import apiUrl from "../../main/utils/AppUrl";

export const RegisterC = async (form) => {
    
    console.log('Hola desde classservice', form);
    try {
       const url = 'http://3.88.177.163:8080/api-siblab/classroom/';
     
       const response = await apiUrl.post('http://3.88.177.163:8080/api-siblab/classroom/',form);
       onSuccess("Registrado correctamente")
       return response;
    } catch (error) {
        console.log("eror de tService",error)
        onFail("Fallo la operacion")

    }
}
export const GetC = async () => {
    try {
        const url = 'http://3.88.177.163:8080/api-siblab/classroom/';
        const response = await apiUrl.get(url);
        return response.data.data;
    } catch (error) {
        console.log("Error desde getC",error)
    }
}
