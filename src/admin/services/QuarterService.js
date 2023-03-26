import axios from "axios";
import { onFail, onSuccess } from "../../main/utils/Alerts";
import apiUrl from "../../main/utils/AppUrl";

export const RegisterQ = async (form) => {

    console.log('Hola desde service quater', form);
    try {
        const fechaString1 = new Date(form.fechaInicio);
        const fechaString2 = new Date(form.fechaFin);

        const fechaInicioString = fechaString1.toISOString().slice(0, 10);
        const fechaFinString = fechaString2.toISOString().slice(0, 10);

        const fechaComponentes = fechaInicioString.split("-");
        const fechaStringInicio = fechaComponentes[2] + "-" + fechaComponentes[1] + "-" + fechaComponentes[0];

        const fechaComponentesFinal = fechaFinString.split("-");
        const fechaStringFin = fechaComponentesFinal[2] + "-" + fechaComponentesFinal[1] + "-" + fechaComponentesFinal[0];

        const dataTeacher = {
            semester: form.name,
            start_semester: fechaStringInicio,
            finish_semester: fechaStringFin,
            user_id: { id: form.docente },
        };
        const url = 'http://localhost:8080/api-siblab/period/';
        const response = await apiUrl.post(url, dataTeacher);
        console.log('registrado', response);
        onSuccess("Registrado correctamente");

        return response;

    } catch (error) {
        onFail("Fallo la operacion")
        console.log("eror de tService", error)
    }

}
