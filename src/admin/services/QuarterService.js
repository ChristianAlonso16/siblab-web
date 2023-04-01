import axios from "axios";
import { onFail, onSuccess } from "../../main/utils/Alerts";
import apiUrl from "../../main/utils/AppUrl";

export const RegisterQ = async (form) => {
    console.log('Hola desde service quater',form);
    try {
        //PARSEABA FECHA A STRING Y LA ORDENABA EN FORMATO DD-MM-YYYY
         const fechaString1 = new Date(form.fechaInicio);
         const fechaString2 = new Date(form.fechaFin);

        const fechaInicioString = fechaString1.toISOString().slice(0,19).replace('T',' ');
        console.log("fecha incii",fechaInicioString)
         const fechaFinString = fechaString2.toISOString().slice(0, 19).replace('T',' ');;

        // const fechaComponentes = fechaInicioString.split("-");
        // const fechaStringInicio = fechaComponentes[2] + "-" + fechaComponentes[1] + "-" + fechaComponentes[0];

        // const fechaComponentesFinal = fechaFinString.split("-");
        // const fechaStringFin = fechaComponentesFinal[2] + "-" + fechaComponentesFinal[1] + "-" + fechaComponentesFinal[0];

        const dataQuater = {
            name: form.name,
            semester_start: fechaInicioString,
            semester_finish: fechaFinString,
        };
        const url = 'http://localhost:8080/api-siblab/semester/';
        const response = await apiUrl.post(url, dataQuater);
        console.log('registrado', response);
        onSuccess("Registrado correctamente");
        return response;
    } catch (error) {
        onFail("Fallo la operacion")
        console.log("eror de tService", error)
    }
}
export const GetQuater = async () =>{
    const response= await apiUrl.get('http://localhost:8080/api-siblab/semester/');
    return response.data.data;
}
