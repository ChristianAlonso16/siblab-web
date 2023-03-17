import axios from "axios";
import apiUrl from "../../main/utils/AppUrl";
export const getAulas = async() =>{

    const url = "http://localhost:8080/api-siblab/laboratory/";
    const response = await apiUrl.get(url);
    console.log('respuesta de AulasService',response.data.data);

    return response;
}

export const getComputerAulas = async()=>{
    const url = "http://localhost:8080/api-siblab/machine/";
        const response  = await apiUrl.get(url);
        console.log('respuesta de service',response);
        return response;
    
}